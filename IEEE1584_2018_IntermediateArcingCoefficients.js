const ElectrodeConfiguration_VCB  = 0;
const ElectrodeConfiguration_VCBB = 1;
const ElectrodeConfiguration_HCB  = 2;
const ElectrodeConfiguration_VOA  = 3;
const ElectrodeConfiguration_HOA  = 4;

class IEEE1584_2018_IntermediateAverageArcingCurrents {
    constructor() {
        this.k1 = 0.0;
        this.k2 = 0.0;
        this.k3 = 0.0;
        this.k4 = 0.0;
        this.k5 = 0.0;
        this.k6 = 0.0;
        this.k7 = 0.0;
        this.k8 = 0.0;
        this.k9 = 0.0;
        this.k10 = 0.0;
    }

    getCoefficients_VCB(voltage) {
        const IntermediateArcingCoefficents = {
            600:   { k1: -0.04287,  k2: 1.035, k3: -0.083, k4:  0.0,        k5: 0.0,        k6: -4.783E-09, k7: 1.962E-06, k8: -0.000229,  k9:  0.003141, k10: 1.092  },
            2700:  { k1:  0.0065,   k2: 1.001, k3: -0.024, k4: -1.557E-12, k5: 4.556E-10, k6: -4.186E-08, k7: 8.346E-07, k8:  5.482E-05, k9: -0.003191, k10: 0.9729 },
            14300: { k1:  0.005795, k2: 1.015, k3: -0.011, k4: -1.557E-12, k5: 4.556E-10, k6: -4.186E-08, k7: 8.346E-07, k8:  5.482E-05, k9: -0.003191, k10: 0.9729 }
        };
        const c = IntermediateArcingCoefficents[voltage];
        this.k1 = c.k1; this.k2 = c.k2; this.k3 = c.k3; this.k4 = c.k4; this.k5 = c.k5;
        this.k6 = c.k6; this.k7 = c.k7; this.k8 = c.k8; this.k9 = c.k9; this.k10 = c.k10;
    }

    getCoefficients_VCBB(voltage) {
        const IntermediateArcingCoefficents = {
            600:   { k1: -0.017432, k2: 0.98,  k3: -0.05,   k4: 0.0, k5:  0.0,        k6: -5.767E-09, k7:  2.524E-06, k8: -0.00034,   k9:  0.01187,  k10: 1.013  },
            2700:  { k1:  0.002823, k2: 0.995, k3: -0.0125, k4: 0.0, k5: -9.204E-11, k6:  2.901E-08, k7: -3.262E-06, k8:  0.0001569, k9: -0.004003, k10: 0.9825 },
            14300: { k1:  0.014827, k2: 1.01,  k3: -0.01,   k4: 0.0, k5: -9.204E-11, k6:  2.901E-08, k7: -3.262E-06, k8:  0.0001569, k9: -0.004003, k10: 0.9825 }
        };
        const c = IntermediateArcingCoefficents[voltage];
        this.k1 = c.k1; this.k2 = c.k2; this.k3 = c.k3; this.k4 = c.k4; this.k5 = c.k5;
        this.k6 = c.k6; this.k7 = c.k7; this.k8 = c.k8; this.k9 = c.k9; this.k10 = c.k10;
    }

    getCoefficients_HCB(voltage) {
        const IntermediateArcingCoefficents = {
            600:   { k1: 0.054922, k2: 0.988, k3: -0.11,   k4: 0.0, k5: 0.0,         k6: -5.382E-09, k7:  2.316E-06, k8: -0.000302,  k9:  0.0091,   k10: 0.9725 },
            2700:  { k1: 0.001011, k2: 1.003, k3: -0.0249, k4: 0.0, k5: 0.0,         k6:  4.859E-10, k7: -1.814E-07, k8: -9.128E-06, k9: -0.0007,   k10: 0.9881 },
            14300: { k1: 0.008693, k2: 0.999, k3: -0.02,   k4: 0.0, k5: -5.043E-11,  k6:  2.233E-08, k7: -3.046E-06, k8:  0.000116,  k9: -0.001145, k10: 0.9839 }
        };
        const c = IntermediateArcingCoefficents[voltage];
        this.k1 = c.k1; this.k2 = c.k2; this.k3 = c.k3; this.k4 = c.k4; this.k5 = c.k5;
        this.k6 = c.k6; this.k7 = c.k7; this.k8 = c.k8; this.k9 = c.k9; this.k10 = c.k10;
    }

    getCoefficients_VOA(voltage) {
        const IntermediateArcingCoefficents = {
            600:   { k1:  0.043785, k2: 1.04,   k3: -0.18,   k4:  0.0,        k5: 0.0,        k6: -4.783E-09, k7: 1.962E-06, k8: -0.000229,  k9:  0.003141, k10: 1.092  },
            2700:  { k1: -0.02395,  k2: 1.006,  k3: -0.0188, k4: -1.557E-12, k5: 4.556E-10, k6: -4.186E-08, k7: 8.346E-07, k8:  5.482E-05, k9: -0.003191, k10: 0.9729 },
            14300: { k1:  0.005371, k2: 1.0102, k3: -0.029,  k4: -1.557E-12, k5: 4.556E-10, k6: -4.186E-08, k7: 8.346E-07, k8:  5.482E-05, k9: -0.003191, k10: 0.9729 }
        };
        const c = IntermediateArcingCoefficents[voltage];
        this.k1 = c.k1; this.k2 = c.k2; this.k3 = c.k3; this.k4 = c.k4; this.k5 = c.k5;
        this.k6 = c.k6; this.k7 = c.k7; this.k8 = c.k8; this.k9 = c.k9; this.k10 = c.k10;
    }

    getCoefficients_HOA(voltage) {
        const IntermediateArcingCoefficents = {
            600:   { k1: 0.111147, k2: 1.008, k3: -0.24,  k4: 0.0, k5: 0.0, k6: -3.895E-09, k7:  1.641E-06, k8: -0.000197,  k9:  0.002615, k10: 1.1    },
            2700:  { k1: 0.000435, k2: 1.006, k3: -0.038, k4: 0.0, k5: 0.0, k6:  7.859E-10, k7: -1.914E-07, k8: -9.128E-06, k9: -0.0007,   k10: 0.9981 },
            14300: { k1: 0.000904, k2: 0.999, k3: -0.02,  k4: 0.0, k5: 0.0, k6:  7.859E-10, k7: -1.914E-07, k8: -9.128E-06, k9: -0.0007,   k10: 0.9981 }
        };
        const c = IntermediateArcingCoefficents[voltage];
        this.k1 = c.k1; this.k2 = c.k2; this.k3 = c.k3; this.k4 = c.k4; this.k5 = c.k5;
        this.k6 = c.k6; this.k7 = c.k7; this.k8 = c.k8; this.k9 = c.k9; this.k10 = c.k10;
    }

    getIntermediateAverageArcingCoefficients(electrodeConfiguration, voltage) {
        switch (electrodeConfiguration) {
            case ElectrodeConfiguration_VCB:
                this.getCoefficients_VCB(voltage);
                break;
            case ElectrodeConfiguration_VCBB:
                this.getCoefficients_VCBB(voltage);
                break;
            case ElectrodeConfiguration_HCB:
                this.getCoefficients_HCB(voltage);
                break;
            case ElectrodeConfiguration_VOA:
                this.getCoefficients_VOA(voltage);
                break;
            case ElectrodeConfiguration_HOA:
                this.getCoefficients_HOA(voltage);
                break;
            default:
                break;
        }
    }

    calculate(electrodeConfiguration, voltage, boltedFaultCurrent, gapDistance) {
        this.getIntermediateAverageArcingCoefficients(electrodeConfiguration, voltage);

        const a = Math.pow(10.0, this.k1 + this.k2 * Math.log10(boltedFaultCurrent) + this.k3 * Math.log10(gapDistance));
        const b = this.k4 * Math.pow(boltedFaultCurrent, 6) +
                  this.k5 * Math.pow(boltedFaultCurrent, 5) +
                  this.k6 * Math.pow(boltedFaultCurrent, 4) +
                  this.k7 * Math.pow(boltedFaultCurrent, 3) +
                  this.k8 * Math.pow(boltedFaultCurrent, 2) +
                  this.k9 * boltedFaultCurrent +
                  this.k10;

        return a * b;
    }
}
