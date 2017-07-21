//BUSINESS LOGIC
var total = 0;

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

var resetOrderForm = function() {
  $("input:radio[name=size]:first").prop("checked", true);
  $("input:checkbox[name=toppings]:checked").each(function(){
    $(this).prop("checked", false);
  });
  $("input:checkbox[name=premium-toppings]:checked").each(function(){
    $(this).prop("checked", false);
  });
  $("#multi").val('1');
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

      //creates array of pizza objects and appends them all to the total
      pizzaArray = [];
      for (var i = 0; i < multiplier; i++) {
        pizzaArray[i] = new Pizza(size, toppings, premiumToppings);
        $(".side-total ul").append("<li><span class='details-multi' data-size = " +
           pizzaArray[i].size +
           " data-toppings = '" + pizzaArray[i].toppings +
           "' data-premium = '" + pizzaArray[i].premium + "'>" +
           pizzaArray[i].size + " $" + pizzaArray[i].getPrice() +
           "</span> - <span class='remove-multi' data-amount = " + pizzaArray[i].getPrice() +
           ">Remove From Cart</span></li>");
        total += pizzaArray[i].getPrice();
      }

      $(".details-multi").click(function(){
        $(".side-form-pizza-size").text($(this).data('size'));
        $(".side-form-pizza-toppings").text($(this).data('toppings').length === 0 && $(this).data('premium').length === 0 ? 'Only Cheese' : $(this).data('toppings') + " " + $(this).data('premium'));
        $(".side-form-details").show();
      });
      $(".remove-multi").click(function(){
        total -= $(this).data('amount');
        this.parentNode.remove();
        $(".total").text(total);
      });
    } else {

      //creates single pizza object and appends it to total
      var newPizza = new Pizza(size, toppings, premiumToppings);
      $(".side-total ul").append("<li><span class='details' data-size = '" + newPizza.size + "'>" + newPizza.size + " $" + newPizza.getPrice() + "</span> - <span class='remove' data-amount = '" + newPizza.getPrice() + "' data-premium = '" + newPizza.premium + "'>Remove From Cart</span></li>");

      total += newPizza.getPrice();

      $(".details").click(function(){
        $(".side-form-pizza-size").text(newPizza.size);
        $(".side-form-pizza-toppings").text(newPizza.toppings.length === 0 && newPizza.premium.length === 0 ? 'Only Cheese' : newPizza.toppings + " " + newPizza.premium);
        $(".side-form-details").show();
      });

// change to using newPizza instead of data
      $(".remove").last().click(function(){
        total -= newPizza.getPrice();
        this.parentNode.remove();
        $(".total").text(total);
      });
    }

    $(".total").text(total);
    resetOrderForm();

    // console.log(newPizza);
    // console.log(newPizza.getPrice());
    // console.log(pizzaArray);
    // console.log(pizzaArray[0].getPrice());
  });
});
