//BUSINESS LOGIC

function Pizza(size, toppings, premium) {
  this.size = size;
  this.toppings = toppings;
  this.premium = premium;
}

Pizza.prototype.getPrice = function(){
  var total = 12;

  switch(this.size) {
    case "medium":
      total+= 2;
      break;
    case "large":
      total+= 4;
      break;
    case "xlarge":
      total+= 6;
      break;
  }

  if (this.toppings) {
    total += (0.75 * this.toppings.length)
  }

  if (this.toppings) {
    total += (1.5 * this.premium.length)
  }

  return total;
}


//UI LOGIC
$(function(){
  $("#order-form").submit(function(event){
    event.preventDefault();

    var size = $("input:radio[name=size]:checked").val();
    var toppings = [];
    $("input:checkbox[name=toppings]:checked").each(function(){
      toppings.push($(this).val());
    });
    var premiumToppings = [];
    $("input:checkbox[name=premium-toppings]:checked").each(function(){
      premiumToppings.push($(this).val());
    });
    var multiplier = $("#multi").val();
    var pizzaArray;
    if (multiplier > 1) {
      pizzaArray = [];
      for (var i = 0; i < multiplier; i++) {
        pizzaArray[i] = new Pizza(size, toppings, premiumToppings);
      }
    } else {
      var newPizza = new Pizza(size, toppings, premiumToppings);
    }


    // console.log(newPizza);
    // console.log(newPizza.getPrice());
    console.log(pizzaArray);
    console.log(pizzaArray[0].getPrice());
  });
});
