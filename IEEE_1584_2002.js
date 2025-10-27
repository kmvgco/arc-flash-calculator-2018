// BUS TYPES

const BT_SWGEAR = 'Switchgear';
const BT_OPENAIR = 'Open Air Bus';
const BT_COND = 'Conductor';
const BT_MCC = 'MCC';
const BT_PANEL = 'Panel';
const BT_SWBRD = 'Switchboard';
const BT_NEMA = 'NEMA E2 Contractor';
const BT_INTSW = 'Int Switch';
const BT_VFD = 'VFD';
const BT_UPS = 'UPS';
const BT_ATS = 'ATS';
const BT_OTHER = 'Other';

const LOOKUP_GAP = 'G';
const LOOKUP_XFC = 'X';

// Check if bus type is open air
function isOpenAir(busType) {
    return busType === BT_OPENAIR || busType === BT_COND;
}

// Get value based on system voltage, bus type, and value type
function getValue(systemVoltage, busType, valueType) {
    const afcLookup = {
        1: {
            [BT_SWGEAR]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_OPENAIR]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 2 },
            [BT_COND]: { [LOOKUP_GAP]: 13, [LOOKUP_XFC]: 1.4738 },
            [BT_MCC]: { [LOOKUP_GAP]: 25, [LOOKUP_XFC]: 1.4738 },
            [BT_PANEL]: { [LOOKUP_GAP]: 25, [LOOKUP_XFC]: 1.4738 },
            [BT_SWBRD]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_NEMA]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_INTSW]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_VFD]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_UPS]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_ATS]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_OTHER]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 }
        },
        2: {
            [BT_SWGEAR]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_OPENAIR]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 2 },
            [BT_COND]: { [LOOKUP_GAP]: 13, [LOOKUP_XFC]: 1.4738 },
            [BT_MCC]: { [LOOKUP_GAP]: 25, [LOOKUP_XFC]: 1.4738 },
            [BT_PANEL]: { [LOOKUP_GAP]: 25, [LOOKUP_XFC]: 1.4738 },
            [BT_SWBRD]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_NEMA]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_INTSW]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_VFD]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_UPS]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_ATS]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 },
            [BT_OTHER]: { [LOOKUP_GAP]: 32, [LOOKUP_XFC]: 1.4738 }
        },
        3: {
            [BT_SWGEAR]: { [LOOKUP_GAP]: 102, [LOOKUP_XFC]: 1 },
            [BT_OPENAIR]: { [LOOKUP_GAP]: 102, [LOOKUP_XFC]: 2 },
            [BT_COND]: { [LOOKUP_GAP]: 13, [LOOKUP_XFC]: 1 },
            [BT_MCC]: { [LOOKUP_GAP]: 102, [LOOKUP_XFC]: 1 },
            [BT_PANEL]: { [LOOKUP_GAP]: 102, [LOOKUP_XFC]: 1 },
            [BT_SWBRD]: { [LOOKUP_GAP]: 102, [LOOKUP_XFC]: 1 },
            [BT_NEMA]: { [LOOKUP_GAP]: 102, [LOOKUP_XFC]: 1 },
            [BT_INTSW]: { [LOOKUP_GAP]: 102, [LOOKUP_XFC]: 1 },
            [BT_VFD]: { [LOOKUP_GAP]: 102, [LOOKUP_XFC]: 1 },
            [BT_UPS]: { [LOOKUP_GAP]: 102, [LOOKUP_XFC]: 1 },
            [BT_ATS]: { [LOOKUP_GAP]: 102, [LOOKUP_XFC]: 1 },
            [BT_OTHER]: { [LOOKUP_GAP]: 102, [LOOKUP_XFC]: 1 }
        }
        // Add remaining voltage classes as needed
    };

    if (systemVoltage < 0.1 || systemVoltage > 1500 || !busType) return 0;

    let voltageClass;
    if (systemVoltage < 0.2) voltageClass = 1;
    else if (systemVoltage <= 1.0) voltageClass = 2;
    else if (systemVoltage <= 5.0) voltageClass = 3;
    else if (systemVoltage <= 15) voltageClass = 4;
    else if (systemVoltage <= 38) voltageClass = 5;
    else if (systemVoltage <= 69) voltageClass = 6;
    else if (systemVoltage <= 115) voltageClass = 7;
    else if (systemVoltage <= 138) voltageClass = 8;
    else if (systemVoltage <= 161) voltageClass = 9;
    else if (systemVoltage <= 230) voltageClass = 10;
    else if (systemVoltage <= 345) voltageClass = 11;
    else if (systemVoltage <= 1500) voltageClass = 12;
    else return 0;

    return afcLookup[voltageClass]?.[busType]?.[valueType] || 0;
}

// IEEE1584_2002 Class
class IEEE1584_2002 {
    constructor() {
        this.ArcFlashBoundary = 0.0;
        this.IncidentEnergy = 0.0;
    }

    calculate(busType, boltedFault, tripTime, workingDistance, systemVoltage) {
        const busRatio = 1;

        // Pre-calculations
        workingDistance *= 25.4; // Convert to millimeters
        const e = 1.2; // Hardcoded to 1.2 per Greg

        const arcGap = getValue(systemVoltage, busType, LOOKUP_GAP);
        const xFactor = getValue(systemVoltage, busType, LOOKUP_XFC);

        // Calculate arcing flash current
        let iaf = 0.0;
        let iarf = 0.0;

        if (systemVoltage <= 1) {
            const k = isOpenAir(busType) ? -0.153 : -0.097;
            const exp1 = Math.pow(10, k + 0.0996 * systemVoltage + 0.000526 * arcGap);
            const exp2 = 0.662 + 0.5588 * systemVoltage - 0.00304 * arcGap;
            iaf = exp1 * Math.pow(boltedFault, exp2);

            iarf = (exp1 * Math.pow(boltedFault * busRatio, exp2)) / busRatio;
        } else if (systemVoltage <= 15) {
            iaf = 1.009718 * Math.pow(boltedFault, 0.983);
            iarf = (1.009718 * Math.pow(boltedFault * busRatio, 0.983)) / busRatio;
        } else {
            iaf = boltedFault;
            iarf = boltedFault;
        }

        // Force negative results to zero
        if (iaf < 0.0) iaf = 0.0;
        if (iarf < 0.0) iarf = 0.0;

        // Calculate incident energy
        let incEnergy = 0.0;
        let arcBndry = 0.0;

        if (systemVoltage <= 15) {
            const c1 = isOpenAir(busType) ? -0.792 : -0.555;
            const c2 = -0.113;
            const c3 = 0.00965;
            const c4 = Math.abs(arcGap) < 0.00001 ? 0.0 : systemVoltage <= 1.0 ? 0.9 : 1.3;
            const c5 = 0.0031;
            const c6 = 0.6;
            const c7 = 0.8;

            const en = Math.pow(10.0, c1 + c2 + 0.0011 * arcGap) * Math.pow(iaf, 1.081);

            const cf = systemVoltage <= 1 ? 1.5 : 1.0;
            const mult = (cf * tripTime * en) / 0.2;

            incEnergy = mult * Math.pow(610.0 / workingDistance, xFactor);

            if (e > 0.0 && xFactor !== 0.0)
                arcBndry = 610.0 * Math.pow(mult / e, 1 / xFactor);
        } else {
            const mult = 512000 * systemVoltage * boltedFault * tripTime;
            incEnergy = mult / (workingDistance * workingDistance);

            if (e > 0.0) arcBndry = Math.sqrt(mult / e);
        }

        const r = 10;

        const abInches = arcBndry / 25.4; // Convert to inches

        this.ArcFlashBoundary = Math.round(abInches * r) / r;
        this.IncidentEnergy = Math.round(incEnergy * r) / r;

        return true;
    }
}

