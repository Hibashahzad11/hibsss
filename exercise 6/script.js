// This function runs when the button is clicked
function calculate() {
    // Get the values from the input boxes
    let cost = parseFloat(document.getElementById("cost").value);
    let liters = parseFloat(document.getElementById("liters").value);
  
    // Calculate total cost
    let total = cost * liters;
  
    // Show the result in the paragraph
    document.getElementById("result").textContent = `Total: AED ${total.toFixed(2)}`;
}