const EnclosureType_Shallow = 0;
const EnclosureType_Typical = 1;

// Electrode configuration constants must be defined somewhere in your codebase
// Example placeholder values:
const ElectrodeConfiguration_VCB = 0;
const ElectrodeConfiguration_VCBB = 1;
const ElectrodeConfiguration_HCB = 2;
const ElectrodeConfiguration_VOA = 3;
const ElectrodeConfiguration_HOA = 4;

class IEEE1584_2018_Enclosure {
    constructor() {
        this.ActualWidth = 0; // mm
        this.ActualHeight = 0; // mm
        this.ActualDepth = 0; // mm

        this.EquivalentWidth = 0; // mm
        this.EquivalentHeight = 0; // mm
        this.EquivalentEnclosureSize = 0; // mm

        this.SystemKv = 0;
        this.CorrectionFactor = 0;

        this.ElectrodeConfig = null;

        this.b1 = 0;
        this.b2 = 0;
        this.b3 = 0;
    }

    setCoefficients(electrodeConfiguration, enclosureType) {
        if (enclosureType === EnclosureType_Shallow) {
            this.setShallowCoefficients(electrodeConfiguration);
        } else {
            this.setTypicalCoefficients(electrodeConfiguration);
        }
    }

    setShallowCoefficients(electrodeConfiguration) {
        const Table7_Shallow = {
            [ElectrodeConfiguration_VCB]:  { b1:  0.002222,  b2: -0.02556, b3:  0.6222 },
            [ElectrodeConfiguration_VCBB]: { b1: -0.002778,  b2:  0.1194,  b3: -0.2778 },
            [ElectrodeConfiguration_HCB]:  { b1: -0.0005556, b2:  0.03722, b3:  0.4778 }
        };

        const coeffs = Table7_Shallow[electrodeConfiguration];
        this.b1 = coeffs.b1;
        this.b2 = coeffs.b2;
        this.b3 = coeffs.b3;
    }

    setTypicalCoefficients(electrodeConfiguration) {
        const Table7_Typical = {
            [ElectrodeConfiguration_VCB]:  { b1: -0.000302,  b2: 0.03441, b3: 0.4325 },
            [ElectrodeConfiguration_VCBB]: { b1: -0.0002976, b2: 0.032,   b3: 0.479  },
            [ElectrodeConfiguration_HCB]:  { b1: -0.0001923, b2: 0.01935, b3: 0.6899 }
        };

        const coeffs = Table7_Typical[electrodeConfiguration];
        this.b1 = coeffs.b1;
        this.b2 = coeffs.b2;
        this.b3 = coeffs.b3;
    }

    getType() {
        if (
            this.SystemKv < 0.6 &&
            this.ActualWidth < 508.0 &&
            this.ActualHeight < 508.0 &&
            this.ActualDepth <= 203.2
        ) {
            return EnclosureType_Shallow;
        }
        return EnclosureType_Typical;
    }

    calculate(electrodeConfiguration, width, height, depth, systemKv) {
        this.ElectrodeConfig = electrodeConfiguration;
        this.ActualWidth = width;
        this.ActualHeight = height;
        this.ActualDepth = depth;
        this.SystemKv = systemKv;

        if (
            electrodeConfiguration === ElectrodeConfiguration_VOA ||
            electrodeConfiguration === ElectrodeConfiguration_HOA
        ) {
            this.EquivalentEnclosureSize = 0.0;
            this.CorrectionFactor = 1.0;
            return;
        }

        this.calculateEquivalentDimensions();

        this.EquivalentEnclosureSize = (this.EquivalentHeight + this.EquivalentWidth) / 2;

        const enclosureType = this.getType();
        this.setCoefficients(electrodeConfiguration, enclosureType);

        if (enclosureType === EnclosureType_Shallow) {
            this.CorrectionFactor = 1.0 / (
                this.b1 * this.EquivalentEnclosureSize * this.EquivalentEnclosureSize +
                this.b2 * this.EquivalentEnclosureSize +
                this.b3
            );
        } else {
            this.CorrectionFactor =
                this.b1 * this.EquivalentEnclosureSize * this.EquivalentEnclosureSize +
                this.b2 * this.EquivalentEnclosureSize +
                this.b3;
        }
    }

    calculateEquivalentDimensions() {
        if (this.getType() === EnclosureType_Shallow) {
            this.EquivalentWidth = 0.03937 * this.ActualWidth;
            this.EquivalentHeight = 0.03937 * this.ActualHeight;
        } else {
            this.EquivalentWidth = this.calculateEquivalentWidthForTypicalEnclosure();
            this.EquivalentHeight = this.calculateEquivalentHeightForTypicalEnclosure();
        }
    }

    calculateEquivalentWidthForTypicalEnclosure() {
        if (this.ActualWidth < 508.0)
            return 20.0;

        if (508.0 <= this.ActualWidth && this.ActualWidth <= 660.4)
            return 0.03937 * this.ActualWidth;

        switch (this.ElectrodeConfig) {
            case ElectrodeConfiguration_VCB:
                if (660.4 < this.ActualWidth && this.ActualWidth <= 1244.6)
                    return (660.4 + (this.ActualWidth - 660.4) * ((this.SystemKv + 4.0) / 20.0)) / 25.4;
                return (660.4 + 584.2 * ((this.SystemKv + 4.0) / 20.0)) / 25.4;

            case ElectrodeConfiguration_VCBB:
                if (660.4 < this.ActualWidth && this.ActualWidth <= 1244.6)
                    return (660.4 + (this.ActualWidth - 660.4) * ((this.SystemKv + 10.0) / 24.0)) / 25.4;
                return (660.4 + 584.2 * ((this.SystemKv + 10.0) / 24.0)) / 25.4;

            case ElectrodeConfiguration_HCB:
                if (660.4 < this.ActualWidth && this.ActualWidth <= 1244.6)
                    return (660.4 + (this.ActualWidth - 660.4) * ((this.SystemKv + 10.0) / 22.0)) / 25.4;
                return (660.4 + 584.2 * ((this.SystemKv + 10.0) / 22.0)) / 25.4;

            default:
                return 0.0;
        }
    }

    calculateEquivalentHeightForTypicalEnclosure() {
        if (this.ActualHeight < 508.0)
            return 20.0;

        if (508.0 <= this.ActualHeight && this.ActualHeight <= 660.4)
            return 0.03937 * this.ActualHeight;

        switch (this.ElectrodeConfig) {
            case ElectrodeConfiguration_VCB:
                if (660.4 < this.ActualHeight && this.ActualHeight <= 1244.6)
                    return 0.03937 * this.ActualHeight;
                return 49.0;

            case ElectrodeConfiguration_VCBB:
                if (660.4 < this.ActualHeight && this.ActualHeight <= 1244.6)
                    return (660.4 + (this.ActualHeight - 660.4) * ((this.SystemKv + 10.0) / 24.0)) / 25.4;
                return (660.4 + 584.2 * ((this.SystemKv + 10.0) / 24.0)) / 25.4;

            case ElectrodeConfiguration_HCB:
                if (660.4 < this.ActualHeight && this.ActualHeight <= 1244.6)
                    return (660.4 + (this.ActualHeight - 660.4) * ((this.SystemKv + 10.0) / 22.0)) / 25.4;
                return (660.4 + 584.2 * ((this.SystemKv + 10.0) / 22.0)) / 25.4;

            default:
                return 0.0;
        }
    }
}

// Export the class if using modules
// module.exports = IEEE1584_2018_Enclosure;
