// BUS TYPES

const BUSTYPE_SWGEAR = 'Switchgear';
const BUSTYPE_OPENAIR = 'Open Air Bus';
const BUSTYPE_COND = 'Conductor';
const BUSTYPE_MCC = 'MCC';
const BUSTYPE_PANEL = 'Panel';
const BUSTYPE_SWBRD = 'Switchboard';
const BUSTYPE_NEMA = 'NEMA E2 Contractor';
const BUSTYPE_INTSW = 'Int Switch';
const BUSTYPE_VFD = 'VFD';
const BUSTYPE_UPS = 'UPS';
const BUSTYPE_ATS = 'ATS';
const BUSTYPE_OTHER = 'Other';

///////////////////////////////////////////////////////////////////////////////
function getIeee1584_2018DefaultGap(system_voltage, bus_type) {
    const afc_lookup = {
        1: {
            [BUSTYPE_SWGEAR]: 32,
            [BUSTYPE_OPENAIR]: 32,
            [BUSTYPE_COND]: 13,
            [BUSTYPE_MCC]: 25,
            [BUSTYPE_PANEL]: 25,
            [BUSTYPE_SWBRD]: 32,
            [BUSTYPE_NEMA]: 32,
            [BUSTYPE_INTSW]: 32,
            [BUSTYPE_VFD]: 32,
            [BUSTYPE_UPS]: 32,
            [BUSTYPE_ATS]: 32,
            [BUSTYPE_OTHER]: 32,
        },
        2: {
            [BUSTYPE_SWGEAR]: 32,
            [BUSTYPE_OPENAIR]: 32,
            [BUSTYPE_COND]: 13,
            [BUSTYPE_MCC]: 25,
            [BUSTYPE_PANEL]: 25,
            [BUSTYPE_SWBRD]: 32,
            [BUSTYPE_NEMA]: 32,
            [BUSTYPE_INTSW]: 32,
            [BUSTYPE_VFD]: 32,
            [BUSTYPE_UPS]: 32,
            [BUSTYPE_ATS]: 32,
            [BUSTYPE_OTHER]: 32,
        },
        3: {
            [BUSTYPE_SWGEAR]: 32,
            [BUSTYPE_OPENAIR]: 32,
            [BUSTYPE_COND]: 32,
            [BUSTYPE_MCC]: 25,
            [BUSTYPE_PANEL]: 25,
            [BUSTYPE_SWBRD]: 32,
            [BUSTYPE_NEMA]: 32,
            [BUSTYPE_INTSW]: 32,
            [BUSTYPE_VFD]: 32,
            [BUSTYPE_UPS]: 32,
            [BUSTYPE_ATS]: 32,
            [BUSTYPE_OTHER]: 32,
        },
        4: {
            [BUSTYPE_SWGEAR]: 104,
            [BUSTYPE_OPENAIR]: 104,
            [BUSTYPE_COND]: 104,
            [BUSTYPE_MCC]: 104,
            [BUSTYPE_PANEL]: 104,
            [BUSTYPE_SWBRD]: 104,
            [BUSTYPE_NEMA]: 104,
            [BUSTYPE_INTSW]: 104,
            [BUSTYPE_VFD]: 104,
            [BUSTYPE_UPS]: 104,
            [BUSTYPE_ATS]: 104,
            [BUSTYPE_OTHER]: 104,
        },
        5: {
            [BUSTYPE_SWGEAR]: 152,
            [BUSTYPE_OPENAIR]: 152,
            [BUSTYPE_COND]: 152,
            [BUSTYPE_MCC]: 152,
            [BUSTYPE_PANEL]: 152,
            [BUSTYPE_SWBRD]: 152,
            [BUSTYPE_NEMA]: 152,
            [BUSTYPE_INTSW]: 152,
            [BUSTYPE_VFD]: 152,
            [BUSTYPE_UPS]: 152,
            [BUSTYPE_ATS]: 152,
            [BUSTYPE_OTHER]: 152,
        },
        6: {
            [BUSTYPE_SWGEAR]: 254,
            [BUSTYPE_OPENAIR]: 254,
            [BUSTYPE_COND]: 254,
            [BUSTYPE_MCC]: 254,
            [BUSTYPE_PANEL]: 254,
            [BUSTYPE_SWBRD]: 254,
            [BUSTYPE_NEMA]: 254,
            [BUSTYPE_INTSW]: 254,
            [BUSTYPE_VFD]: 254,
            [BUSTYPE_UPS]: 254,
            [BUSTYPE_ATS]: 254,
            [BUSTYPE_OTHER]: 254,
        },
        7: {
            [BUSTYPE_SWGEAR]: 342.9,
            [BUSTYPE_OPENAIR]: 101.6,
            [BUSTYPE_COND]: 342.9,
            [BUSTYPE_MCC]: 342.9,
            [BUSTYPE_PANEL]: 342.9,
            [BUSTYPE_SWBRD]: 342.9,
            [BUSTYPE_NEMA]: 342.9,
            [BUSTYPE_INTSW]: 342.9,
            [BUSTYPE_VFD]: 342.9,
            [BUSTYPE_UPS]: 342.9,
            [BUSTYPE_ATS]: 342.9,
            [BUSTYPE_OTHER]: 342.9,
        },
        8: {
            [BUSTYPE_SWGEAR]: 342.9,
            [BUSTYPE_OPENAIR]: 177.8,
            [BUSTYPE_COND]: 342.9,
            [BUSTYPE_MCC]: 342.9,
            [BUSTYPE_PANEL]: 342.9,
            [BUSTYPE_SWBRD]: 342.9,
            [BUSTYPE_NEMA]: 342.9,
            [BUSTYPE_INTSW]: 342.9,
            [BUSTYPE_VFD]: 342.9,
            [BUSTYPE_UPS]: 342.9,
            [BUSTYPE_ATS]: 342.9,
            [BUSTYPE_OTHER]: 342.9,
        },
        9: {
            [BUSTYPE_SWGEAR]: 342.9,
            [BUSTYPE_OPENAIR]: 203.2,
            [BUSTYPE_COND]: 342.9,
            [BUSTYPE_MCC]: 342.9,
            [BUSTYPE_PANEL]: 342.9,
            [BUSTYPE_SWBRD]: 342.9,
            [BUSTYPE_NEMA]: 342.9,
            [BUSTYPE_INTSW]: 342.9,
            [BUSTYPE_VFD]: 342.9,
            [BUSTYPE_UPS]: 342.9,
            [BUSTYPE_ATS]: 342.9,
            [BUSTYPE_OTHER]: 342.9,
        },
        10: {
            [BUSTYPE_SWGEAR]: 342.9,
            [BUSTYPE_OPENAIR]: 254.0,
            [BUSTYPE_COND]: 342.9,
            [BUSTYPE_MCC]: 342.9,
            [BUSTYPE_PANEL]: 342.9,
            [BUSTYPE_SWBRD]: 342.9,
            [BUSTYPE_NEMA]: 342.9,
            [BUSTYPE_INTSW]: 342.9,
            [BUSTYPE_VFD]: 342.9,
            [BUSTYPE_UPS]: 342.9,
            [BUSTYPE_ATS]: 342.9,
            [BUSTYPE_OTHER]: 342.9,
        },
        11: {
            [BUSTYPE_SWGEAR]: 342.9,
            [BUSTYPE_OPENAIR]: 355.6,
            [BUSTYPE_COND]: 342.9,
            [BUSTYPE_MCC]: 342.9,
            [BUSTYPE_PANEL]: 342.9,
            [BUSTYPE_SWBRD]: 342.9,
            [BUSTYPE_NEMA]: 342.9,
            [BUSTYPE_INTSW]: 342.9,
            [BUSTYPE_VFD]: 342.9,
            [BUSTYPE_UPS]: 342.9,
            [BUSTYPE_ATS]: 342.9,
            [BUSTYPE_OTHER]: 342.9,
        },
        12: {
            [BUSTYPE_SWGEAR]: 342.9,
            [BUSTYPE_OPENAIR]: 508.0,
            [BUSTYPE_COND]: 342.9,
            [BUSTYPE_MCC]: 342.9,
            [BUSTYPE_PANEL]: 342.9,
            [BUSTYPE_SWBRD]: 342.9,
            [BUSTYPE_NEMA]: 342.9,
            [BUSTYPE_INTSW]: 342.9,
            [BUSTYPE_VFD]: 342.9,
            [BUSTYPE_UPS]: 342.9,
            [BUSTYPE_ATS]: 342.9,
            [BUSTYPE_OTHER]: 342.9,
        },
        13: {
            [BUSTYPE_SWGEAR]: 342.9,
            [BUSTYPE_OPENAIR]: 812.8,
            [BUSTYPE_COND]: 342.9,
            [BUSTYPE_MCC]: 342.9,
            [BUSTYPE_PANEL]: 342.9,
            [BUSTYPE_SWBRD]: 342.9,
            [BUSTYPE_NEMA]: 342.9,
            [BUSTYPE_INTSW]: 342.9,
            [BUSTYPE_VFD]: 342.9,
            [BUSTYPE_UPS]: 342.9,
            [BUSTYPE_ATS]: 342.9,
            [BUSTYPE_OTHER]: 342.9,
        }
    };

    if (system_voltage < 0.1 || system_voltage > 1500 || !bus_type)
        return 0;

    let voltage_class;
    if (system_voltage <= 0.2) voltage_class = 1;
    else if (system_voltage <= 0.6) voltage_class = 2;
    else if (system_voltage < 1.0) voltage_class = 3;
    else if (system_voltage <= 5.0) voltage_class = 4;
    else if (system_voltage <= 15.0) voltage_class = 5;
    else if (system_voltage <= 38.0) voltage_class = 6;
    else if (system_voltage <= 69.0) voltage_class = 7;
    else if (system_voltage <= 115.0) voltage_class = 8;
    else if (system_voltage <= 138.0) voltage_class = 9;
    else if (system_voltage <= 161.0) voltage_class = 10;
    else if (system_voltage <= 230.0) voltage_class = 11;
    else if (system_voltage <= 345.0) voltage_class = 12;
    else if (system_voltage <= 1500) voltage_class = 13;
    else return 0;

    return afc_lookup[voltage_class][bus_type] || 0;
}
