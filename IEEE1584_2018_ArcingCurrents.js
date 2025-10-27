// Dependencies
//const { IEEE1584_2018_IntermediateAverageArcingCurrents } = require('./IEEE1584_2018_IntermediateArcingCoefficients');
//const { IEEE1584_2018_MinimumArcingCurrents } = require('./IEEE1584_2018_MinimumArcingCoefficients');
// const { IEEE1584_2018_Enclosure } = require('./IEEE1584_2018_Enclosure'); // Not used in this file

class IEEE1584_2018_ArcingCurrents {
    constructor() {
        this.ElectrodeConfig = 0;

        this.SystemKv = 0.0;
        this.BoltedFaultCurrent = 0.0;
        this.GapDistance = 0.0;

        this.FinalArcingCurrent = 0.0;
        this.MinimumArcingCurrent = 0.0;

        this.IntermediateAverageArcingCurrent600V = 0.0;
        this.IntermediateAverageArcingCurrent2700V = 0.0;
        this.IntermediateAverageArcingCurrent14300V = 0.0;

        this.MinimumArcingCurrent600V = 0.0;
        this.MinimumArcingCurrent2700V = 0.0;
        this.MinimumArcingCurrent14300V = 0.0;
    }

    // Private method
    CalculateArcingCurrent(systemKv, boltedFaultCurrent, arcingCurrentAt600Volts, arcingCurrentAt2700Volts, arcingCurrentAt14300Volts) {
        if (systemKv <= 0.6) {
            // Equation #25 (page 27)
            return 1 / Math.sqrt(
                Math.pow(0.6 / systemKv, 2) *
                (
                    (1 / (arcingCurrentAt600Volts * arcingCurrentAt600Volts)) -
                    ((0.6 * 0.6 - systemKv * systemKv) / (0.6 * 0.6 * boltedFaultCurrent * boltedFaultCurrent))
                )
            );
        }

        // Equation #16 (page 25)
        const arcingCurrent1 = ((arcingCurrentAt2700Volts - arcingCurrentAt600Volts) / 2.1) * (systemKv - 2.7) + arcingCurrentAt2700Volts;

        // Equation #17 (page 25)
        const arcingCurrent2 = ((arcingCurrentAt14300Volts - arcingCurrentAt2700Volts) / 11.6) * (systemKv - 14.3) + arcingCurrentAt14300Volts;

        // Equation #18 (page 25)
        const arcingCurrent3 = (arcingCurrent1 * (2.7 - systemKv) / 2.1) + (arcingCurrent2 * (systemKv - 0.6) / 2.1);

        if (0.6 < systemKv && systemKv <= 2.7) {
            return arcingCurrent3;
        }

        // if 2.7 < systemKv
        return arcingCurrent2;
    }

    Calculate(electrodeConfiguration, systemKv, boltedFaultCurrentKA, gapDistanceMM) {
        this.ElectrodeConfig = electrodeConfiguration;
        this.SystemKv = systemKv;
        this.BoltedFaultCurrent = boltedFaultCurrentKA;
        this.GapDistance = gapDistanceMM;

        if (15.0 < systemKv) {
            this.FinalArcingCurrent = boltedFaultCurrentKA;
        } else {
            const IntermediateArcingCurrents = new IEEE1584_2018_IntermediateAverageArcingCurrents();

            this.IntermediateAverageArcingCurrent600V = IntermediateArcingCurrents.Calculate(electrodeConfiguration, 600, boltedFaultCurrentKA, gapDistanceMM);
            this.IntermediateAverageArcingCurrent2700V = IntermediateArcingCurrents.Calculate(electrodeConfiguration, 2700, boltedFaultCurrentKA, gapDistanceMM);
            this.IntermediateAverageArcingCurrent14300V = IntermediateArcingCurrents.Calculate(electrodeConfiguration, 14300, boltedFaultCurrentKA, gapDistanceMM);

            this.FinalArcingCurrent = this.CalculateArcingCurrent(
                systemKv,
                boltedFaultCurrentKA,
                this.IntermediateAverageArcingCurrent600V,
                this.IntermediateAverageArcingCurrent2700V,
                this.IntermediateAverageArcingCurrent14300V
            );

            if (systemKv <= 0.6) {
                this.MinimumArcingCurrent = IEEE1584_2018_MinimumArcingCurrents.Calculate(
                    electrodeConfiguration,
                    this.FinalArcingCurrent,
                    systemKv
                );
            } else {
                this.MinimumArcingCurrent600V = IEEE1584_2018_MinimumArcingCurrents.Calculate(
                    electrodeConfiguration,
                    this.IntermediateAverageArcingCurrent600V,
                    systemKv
                );
                this.MinimumArcingCurrent2700V = IEEE1584_2018_MinimumArcingCurrents.Calculate(
                    electrodeConfiguration,
                    this.IntermediateAverageArcingCurrent2700V,
                    systemKv
                );
                this.MinimumArcingCurrent14300V = IEEE1584_2018_MinimumArcingCurrents.Calculate(
                    electrodeConfiguration,
                    this.IntermediateAverageArcingCurrent14300V,
                    systemKv
                );

                this.MinimumArcingCurrent = this.CalculateArcingCurrent(
                    systemKv,
                    boltedFaultCurrentKA,
                    this.MinimumArcingCurrent600V,
                    this.MinimumArcingCurrent2700V,
                    this.MinimumArcingCurrent14300V
                );
            }
        }
    }
}

//module.exports = { IEEE1584_2018_ArcingCurrents };
