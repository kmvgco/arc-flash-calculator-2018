class IEEE1584_2018_IntermediateCoefficients {
    constructor(electrodeConfiguration, voltage) {
        this.k1 = 0;
        this.k2 = 0;
        this.k3 = 0;
        this.k4 = 0;
        this.k5 = 0;
        this.k6 = 0;
        this.k7 = 0;
        this.k8 = 0;
        this.k9 = 0;
        this.k10 = 0;
        this.k11 = 0;
        this.k12 = 0;
        this.k13 = 0;
        this.setCoefficients(electrodeConfiguration, voltage);
    }

    setCoefficients(electrodeConfiguration, voltage) {
        switch (voltage) {
            case 600:
                this.setCoefficients_600V(electrodeConfiguration);
                break;
            case 2700:
                this.setCoefficients_2700V(electrodeConfiguration);
                break;
            case 14300:
                this.setCoefficients_14300V(electrodeConfiguration);
                break;
        }
    }

    setCoefficients_600V(electrodeConfiguration) {
        const Table3_600V = {
            ElectrodeConfiguration_VCB:  { k1: 0.753364, k2: 0.566, k3: 1.752636, k4: 0.0, k5: 0.0, k6: -4.783E-09, k7: 0.000001962, k8: -0.000229, k9: 0.003141, k10: 1.092,  k11: 0.0,  k12: -1.598, k13: 0.957 },
            ElectrodeConfiguration_VCBB: { k1: 3.068459, k2: 0.26,  k3: -0.098107, k4: 0.0, k5: 0.0, k6: -5.767E-09, k7: 0.000002524, k8: -0.00034,  k9: 0.01187,  k10: 1.013,  k11: -0.06, k12: -1.809, k13: 1.19  },
            ElectrodeConfiguration_HCB:  { k1: 4.073745, k2: 0.344, k3: -0.370259, k4: 0.0, k5: 0.0, k6: -5.382E-09, k7: 0.000002316, k8: -0.000302, k9: 0.0091,   k10: 0.9725, k11: 0.0,  k12: -2.03,  k13: 1.036 },
            ElectrodeConfiguration_VOA:  { k1: 0.679294, k2: 0.746, k3: 1.222636,  k4: 0.0, k5: 0.0, k6: -4.783E-09, k7: 0.000001962, k8: -0.000229, k9: 0.003141, k10: 1.092,  k11: 0.0,  k12: -1.598, k13: 0.997 },
            ElectrodeConfiguration_HOA:  { k1: 3.470417, k2: 0.465, k3: -0.261863, k4: 0.0, k5: 0.0, k6: -3.895E-09, k7: 0.000001641, k8: -0.000197, k9: 0.002615, k10: 1.1,    k11: 0.0,  k12: -1.99,  k13: 1.04  }
        };

        const coeffs = Table3_600V[electrodeConfiguration];
        if (coeffs) {
            Object.assign(this, coeffs);
        }
    }

    setCoefficients_2700V(electrodeConfiguration) {
        const Table3_2700V = {
            ElectrodeConfiguration_VCB:  { k1: 2.400210, k2: 0.165, k3: 0.354202,  k4: -1.557E-12, k5: 4.556E-10,  k6: -4.186E-08, k7: 8.346E-07,  k8: 5.482E-05,  k9: -0.003191, k10: 0.9729, k11: 0.0,   k12: -1.569, k13: 0.9778 },
            ElectrodeConfiguration_VCBB: { k1: 3.870592, k2: 0.185, k3: -0.736618, k4: 0.0,        k5: -9.204E-11, k6: 2.901E-08,  k7: -3.262E-06, k8: 0.0001569, k9: -0.004003, k10: 0.9825, k11: 0.0,   k12: -1.742, k13: 1.09   },
            ElectrodeConfiguration_HCB:  { k1: 3.486391, k2: 0.177, k3: -0.193101, k4: 0.0,        k5: 0.0,        k6: 4.859E-10,  k7: -1.814E-07, k8: -9.128E-06, k9: -0.000700, k10: 0.9881, k11: 0.027, k12: -1.723, k13: 1.055  },
            ElectrodeConfiguration_VOA:  { k1: 3.880724, k2: 0.105, k3: -1.906033, k4: -1.557E-12, k5: 4.556E-10,  k6: -4.186E-08, k7: 8.346E-07,  k8: 5.482E-05,  k9: -0.003191, k10: 0.9729, k11: 0.0,   k12: -1.515, k13: 1.115  },
            ElectrodeConfiguration_HOA:  { k1: 3.616266, k2: 0.149, k3: -0.761561, k4: 0.0,        k5: 0.0,        k6: 7.859E-10,  k7: -1.914E-07, k8: -9.128E-06, k9: -0.000700, k10: 0.9981, k11: 0.0,   k12: -1.639, k13: 1.078  }
        };

        const coeffs = Table3_2700V[electrodeConfiguration];
        if (coeffs) {
            Object.assign(this, coeffs);
        }
    }

    setCoefficients_14300V(electrodeConfiguration) {
        const Table3_14300V = {
            ElectrodeConfiguration_VCB:  { k1: 3.825917, k2: 0.11,  k3: -0.999749, k4: -1.557E-12, k5: 4.556E-10,  k6: -4.186E-08, k7: 8.346E-07,  k8: 5.482E-05,  k9: -0.003191, k10: 0.9729, k11: 0.0,   k12: -1.568, k13: 0.99  },
            ElectrodeConfiguration_VCBB: { k1: 3.644309, k2: 0.215, k3: -0.585522, k4: 0.0,        k5: -9.204E-11, k6: 2.901E-08,  k7: -3.262E-06, k8: 0.0001569, k9: -0.004003, k10: 0.9825, k11: 0.0,   k12: -1.677, k13: 1.06  },
            ElectrodeConfiguration_HCB:  { k1: 3.044516, k2: 0.125, k3: 0.245106,  k4: 0.0,        k5: -5.043E-11, k6: 2.233E-08,  k7: -3.046E-06, k8: 0.000116,  k9: -0.001145, k10: 0.9839, k11: 0.0,   k12: -1.655, k13: 1.084 },
            ElectrodeConfiguration_VOA:  { k1: 3.405454, k2: 0.12,  k3: -0.932450, k4: -1.557E-12, k5: 4.556E-10,  k6: -4.186E-08, k7: 8.346E-07,  k8: 5.482E-05,  k9: -0.003191, k10: 0.9729, k11: 0.0,   k12: -1.534, k13: 0.979 },
            ElectrodeConfiguration_HOA:  { k1: 2.040490, k2: 0.177, k3: 1.005092,  k4: 0.0,        k5: 0.0,        k6: 7.859E-10,  k7: -1.914E-07, k8: -9.128E-06, k9: -0.0007,   k10: 0.9981, k11: -0.05, k12: -1.633, k13: 1.151 }
        };

        const coeffs = Table3_14300V[electrodeConfiguration];
        if (coeffs) {
            Object.assign(this, coeffs);
        }
    }
}

// Example usage:
// const coeffs = new IEEE1584_2018_IntermediateCoefficients('ElectrodeConfiguration_VCB', 600);
// console.log(coeffs.k1);
