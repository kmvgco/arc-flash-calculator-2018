// Conversion of the selected PHP logic to JavaScript.

function calculateArcFlashResults({
    electrodeConfig,
    systemVoltage,
    boltedFault,
    busType,
    enclosureWidth,
    enclosureHeight,
    enclosureDepth,
    tripTime,
    workingDistance
}) {
    let results = "";

    // Get default arc gap
    const arcGap = getIeee1584_2018DefaultGap(systemVoltage, busType);

    // Calculate arcing currents
    const arcCurrents = new IEEE1584_2018_ArcingCurrents();
    arcCurrents.calculate(electrodeConfig, systemVoltage, boltedFault, arcGap);

    // Calculate enclosure correction factor
    const enclosure = new IEEE1584_2018_Enclosure();
    enclosure.calculate(
        electrodeConfig,
        enclosureWidth * 25.4,
        enclosureHeight * 25.4,
        enclosureDepth * 25.4,
        systemVoltage
    );

    // Calculate arc flash boundary
    const afb = new IEEE1584_2018_ArcFlashBoundary();
    const arcflashBoundary = afb.calculate(
        arcCurrents,
        parseFloat(tripTime) * 1000.0,
        enclosure.correctionFactor
    );

    // Calculate incident energy
    const ie = new IEEE1584_2018_IncidentEnergy();
    const incidentEnergy = ie.calculate(
        arcCurrents,
        workingDistance * 25.4,
        parseFloat(tripTime),
        enclosure.correctionFactor
    );

    // Format results
    const r = 10;
    const afbInches = arcflashBoundary / 25.4;
    const afbInchesRounded = Math.round(afbInches * r) / r;
    const ieEnergyRounded = (incidentEnergy * 1000).toFixed(2);

    const finalArcingCurrent = arcCurrents.finalArcingCurrent.toFixed(2);
    const minimumArcingCurrent = arcCurrents.minimumArcingCurrent.toFixed(2);

    // Calculate intermediate average arcing currents
    const intermediateArcingCurrents = new IEEE1584_2018_IntermediateAverageArcingCurrents();
    const ac2700 = intermediateArcingCurrents.calculate(
        electrodeConfig,
        2700,
        boltedFault,
        arcGap
    );

    // Build HTML results
    results += `<div class="afc-result-item"><strong>Arc Boundary</strong><br/>${afbInchesRounded} inches</div>`;
    results += `<div class="afc-result-item"><strong>Incident Energy</strong><br/>${ieEnergyRounded} cal/cm<sup>2</sup></div>`;
    results += `<div class="afc-result-items-bottom">
            <span>
            <b>Average Arcing Current:</b> ${finalArcingCurrent} kA<br/>
            <b>Minimum Arcing Current:</b> ${minimumArcingCurrent} kA<br/>
            </span>
            </div>`;

    return results;
}