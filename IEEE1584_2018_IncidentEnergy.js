// Dependencies
//const { IEEE1584_2018_ArcingCurrents } = require('./IEEE1584_2018_ArcingCurrents');
//const { IEEE1584_2018_IntermediateCoefficients } = require('./IEEE1584_2018_IntermediateCoefficients');
// Note: Enclosure class/module must be implemented or imported as needed

class IEEE1584_2018_IncidentEnergy {
    constructor() {
        this.ElectrodeConfig = null;
        this.BoltedFaultCurrent = null; // Ibf
        this.CorrectionFactor = null;   // CF
        this.GapDistance = null;        // G
        this.WorkingDistance = null;    // D
        this.SystemKv = null;
    }

    CalculateEx(arcingCurrents, arcDuration, width, height, depth) {
        const enclosure = new Enclosure();
        enclosure.Calculate(
            arcingCurrents.ElectrodeConfig,
            width,
            height,
            depth,
            arcingCurrents.SystemKv
        );
        return this.Calculate(
            arcingCurrents,
            arcDuration,
            enclosure.CorrectionFactor
        );
    }

    Calculate(arcingCurrents, workingDistance, arcDuration, correctionFactor) {
        this.ElectrodeConfig = arcingCurrents.ElectrodeConfig;      // EC
        this.BoltedFaultCurrent = arcingCurrents.BoltedFaultCurrent; // Ibf
        this.GapDistance = arcingCurrents.GapDistance;              // G
        this.SystemKv = arcingCurrents.SystemKv;                    // Voc

        this.WorkingDistance = workingDistance;     // D
        this.CorrectionFactor = correctionFactor;   // CF

        const finalArcingCurrent = arcingCurrents.FinalArcingCurrent;
        const minimumArcingCurrent = arcingCurrents.MinimumArcingCurrent;

        if (this.SystemKv <= 0.6) {
            const rmsArcingCurrent600V = arcingCurrents.IntermediateAverageArcingCurrent600V;
            let final1 = this.CalculateIntermediate(
                600,
                rmsArcingCurrent600V,
                finalArcingCurrent,
                arcDuration
            );
            return final1 /= 4.184;
        }

        // Compute final #1 RMS arcing currents
        const rmsArcingCurrent600V = arcingCurrents.IntermediateAverageArcingCurrent600V;
        const rmsArcingCurrent2700V = arcingCurrents.IntermediateAverageArcingCurrent2700V;
        const rmsArcingCurrent14300V = arcingCurrents.IntermediateAverageArcingCurrent14300V;

        let final1 = this.CalculateFinal(
            rmsArcingCurrent600V,
            rmsArcingCurrent2700V,
            rmsArcingCurrent14300V,
            arcDuration
        );

        return final1 /= 4.184;
    }

    CalculateFinal(arcingCurrent600V, arcingCurrent2700V, arcingCurrent14300V, arcDuration) {
        const incidentEnergy600V = this.CalculateIntermediate(
            600,
            arcingCurrent600V,
            arcingCurrent600V,
            arcDuration
        );
        const incidentEnergy2700V = this.CalculateIntermediate(
            2700,
            arcingCurrent2700V,
            arcingCurrent2700V,
            arcDuration
        );
        const incidentEnergy14300V = this.CalculateIntermediate(
            14300,
            arcingCurrent14300V,
            arcingCurrent14300V,
            arcDuration
        );

        const E1 = ((incidentEnergy2700V - incidentEnergy600V) / 2.1) * (this.SystemKv - 2.7) + incidentEnergy2700V;
        const E2 = ((incidentEnergy14300V - incidentEnergy2700V) / 11.6) * (this.SystemKv - 14.3) + incidentEnergy14300V;

        if (0.6 < this.SystemKv && this.SystemKv <= 2.7) {
            const E3 = (E1 * (2.7 - this.SystemKv) / 2.1) + (E2 * (this.SystemKv - 0.6) / 2.1);
            return E3;
        }

        // if 2.7 < SystemKv
        return E2;
    }

    CalculateIntermediate(voltage, rmsArcingCurrent, arcingCurrent, arcDuration) {
        const coefs = new IEEE1584_2018_IntermediateCoefficients(this.ElectrodeConfig, voltage);

        const a = coefs.k4 * Math.pow(this.BoltedFaultCurrent, 7) +
            coefs.k5 * Math.pow(this.BoltedFaultCurrent, 6) +
            coefs.k6 * Math.pow(this.BoltedFaultCurrent, 5) +
            coefs.k7 * Math.pow(this.BoltedFaultCurrent, 4) +
            coefs.k8 * Math.pow(this.BoltedFaultCurrent, 3) +
            coefs.k9 * Math.pow(this.BoltedFaultCurrent, 2) +
            coefs.k10 * this.BoltedFaultCurrent;

        const b = coefs.k11 * Math.log10(this.BoltedFaultCurrent) +
            coefs.k12 * Math.log10(this.WorkingDistance) +
            coefs.k13 * Math.log10(arcingCurrent) +
            Math.log10(1.0 / this.CorrectionFactor);

        const exponent = coefs.k1 +
            coefs.k2 * Math.log10(this.GapDistance) +
            (coefs.k3 * rmsArcingCurrent) / a +
            b;

        return 12.552 / 50 * arcDuration * Math.pow(10.0, exponent);
    }
}

//module.exports = { IEEE1584_2018_IncidentEnergy };
