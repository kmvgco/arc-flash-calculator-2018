// /////////////////////////////////////////////////////////////////////////////
// IEEE1584_2018_MinimumArcingCurrents.js

class IEEE1584_2018_MinimumArcingCurrents {
    // /////////////////////////////////////////////////////////////////////////////
    static calculate(electrodeConfiguration, arcingCurrent, systemKv) {
        const ReducedArcingCoefficents = {
            [ElectrodeConfiguration_VCB]:  { k1: 0.0,         k2: -0.0000014269, k3: 0.000083137, k4: -0.0019382, k5: 0.022366, k6: -0.12645, k7: 0.30226 },
            [ElectrodeConfiguration_VCBB]: { k1: 1.138E-06,   k2: -6.0287E-05,   k3: 0.0012758,   k4: -0.013778,  k5: 0.080217, k6: -0.24066, k7: 0.33524 },
            [ElectrodeConfiguration_HCB]:  { k1: 0.0,         k2: -3.097E-06,    k3: 0.00016405,  k4: -0.0033609, k5: 0.033308, k6: -0.16182, k7: 0.34627 },
            [ElectrodeConfiguration_VOA]:  { k1: 9.5606E-07,  k2: -5.1543E-05,   k3: 0.0011161,   k4: -0.01242,   k5: 0.075125, k6: -0.23584, k7: 0.33696 },
            [ElectrodeConfiguration_HOA]:  { k1: 0.0,         k2: -3.1555E-06,   k3: 0.0001682,   k4: -0.0034607, k5: 0.034124, k6: -0.1599,  k7: 0.34629 }
        };

        if (electrodeConfiguration < 0 || electrodeConfiguration >= 5)
            return 0.0;

        const coeffs = ReducedArcingCoefficents[electrodeConfiguration];
        const k1 = coeffs.k1;
        const k2 = coeffs.k2;
        const k3 = coeffs.k3;
        const k4 = coeffs.k4;
        const k5 = coeffs.k5;
        const k6 = coeffs.k6;
        const k7 = coeffs.k7;

        // Equation #2 (page 18)
        //
        // Iarc_min = Iarc x ( 1 - 0.5 x VarCf )
        //
        // VarCf = k1Voc6 + k2Voc5 + k3Voc4 + k4Voc³ + k5Voc² + k6Voc + k7;
        //

        const arcingCurrentVariationCorrectionFactor =
            k1 * Math.pow(systemKv, 6) +
            k2 * Math.pow(systemKv, 5) +
            k3 * Math.pow(systemKv, 4) +
            k4 * Math.pow(systemKv, 3) +
            k5 * Math.pow(systemKv, 2) +
            k6 * systemKv +
            k7;

        return arcingCurrent * (1.0 - 0.5 * arcingCurrentVariationCorrectionFactor);
    }
}

// Export the class if using modules
// module.exports = IEEE1584_2018_MinimumArcingCurrents;
