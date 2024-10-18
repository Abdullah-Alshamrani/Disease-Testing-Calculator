// Developer: Abdullah Alshamrani
// 10/17/2024

document.getElementById("calculateBtn").addEventListener("click", function() {
    // Get input values
    let population = parseFloat(document.getElementById("population").value);
    let prevalence = parseFloat(document.getElementById("prevalence").value) / 100;
    let sensitivity = parseFloat(document.getElementById("sensitivity").value) / 100;
    let specificity = parseFloat(document.getElementById("specificity").value) / 100;
    let confidenceLevel = parseFloat(document.getElementById("confidence").value) / 100;
    
    // Basic calculations
    let diseasePositive = population * prevalence;
    let diseaseNegative = population - diseasePositive;
    let truePositive = diseasePositive * sensitivity;
    let falsePositive = diseaseNegative * (1 - specificity);
    let falseNegative = diseasePositive * (1 - sensitivity);
    let trueNegative = diseaseNegative * specificity;

    // PPV and NPV
    let ppv = (truePositive / (truePositive + falsePositive)) * 100;
    let npv = (trueNegative / (trueNegative + falseNegative)) * 100;
    
    // Likelihood Ratios
    let lrPositive = sensitivity / (1 - specificity);
    let lrNegative = (1 - sensitivity) / specificity;

    // Accuracy
    let accuracy = ((truePositive + trueNegative) / population) * 100;

    // SE and CI for LR+
    let seLRP = Math.sqrt((1 - sensitivity) / (sensitivity * truePositive) + (1 - specificity) / (specificity * falsePositive));
    let ciLRP_lower = Math.exp(Math.log(lrPositive) - 1.96 * seLRP);
    let ciLRP_upper = Math.exp(Math.log(lrPositive) + 1.96 * seLRP);
    
    // SE and CI for LR-
    let seLRN = Math.sqrt((1 - sensitivity) / (sensitivity * falseNegative) + (1 - specificity) / (specificity * trueNegative));
    let ciLRN_lower = Math.exp(Math.log(lrNegative) - 1.96 * seLRN);
    let ciLRN_upper = Math.exp(Math.log(lrNegative) + 1.96 * seLRN);

    // Update results
    document.getElementById("truePositive").innerText = `True Positive: ${Math.round(truePositive)}`;
    document.getElementById("falsePositive").innerText = `False Positive: ${Math.round(falsePositive)}`;
    document.getElementById("falseNegative").innerText = `False Negative: ${Math.round(falseNegative)}`;
    document.getElementById("trueNegative").innerText = `True Negative: ${Math.round(trueNegative)}`;
    document.getElementById("ppv").innerText = `Positive Predictive Value (PPV): ${ppv.toFixed(2)}%`;
    document.getElementById("npv").innerText = `Negative Predictive Value (NPV): ${npv.toFixed(2)}%`;
    document.getElementById("lrPositive").innerText = `Positive Likelihood Ratio (LR+): ${lrPositive.toFixed(2)}`;
    document.getElementById("lrNegative").innerText = `Negative Likelihood Ratio (LR-): ${lrNegative.toFixed(2)}`;
    document.getElementById("accuracy").innerText = `Accuracy: ${accuracy.toFixed(2)}%`;
    
    // Display SE and CIs for LR+
    document.getElementById("seLRP").innerText = `SE LR+: ${seLRP.toFixed(2)}`;
    document.getElementById("ciLRP").innerText = `LR+ CI: ${ciLRP_lower.toFixed(2)} to ${ciLRP_upper.toFixed(2)}`;
    
    // Display SE and CIs for LR-
    document.getElementById("seLRN").innerText = `SE LR-: ${seLRN.toFixed(2)}`;
    document.getElementById("ciLRN").innerText = `LR- CI: ${ciLRN_lower.toFixed(2)} to ${ciLRN_upper.toFixed(2)}`;
});
