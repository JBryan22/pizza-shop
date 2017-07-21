//BUSINESS LOGIC

function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.getPrice = function(){

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

    var newPizza = new Pizza(size, toppings);
    console.log(newPizza);
  });
});
