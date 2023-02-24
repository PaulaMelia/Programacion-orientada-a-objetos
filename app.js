//hacemos objeto para interfaz y otro objeto para el producto


class Product{  //clase de producto con un constructor con todas sus propiedades
    constructor(name,price,year){ //parametros
      this.name=name;
      this.price=price;
      this.year=year;
    }
}

//ACCIONES DOM


//accion para hacer el submit//COLUM 1 
document.getElementById('product-form')
    .addEventListener('submit', (e) => { //addEventListener coge aciones/eventos

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    
     
     const product = new Product(name, price, year); 
     //transforma los datos del formulario en un ojeto
     const ui = new UI();
      
    if(name===''|| price===''|| year===''){
      return ui.actionsMessage('Campos del formulario sin completar','warning')
    }

     //llamo a las funciones UI
     ui.addProduct(product); 
     ui.resetForm();
     ui.actionsMessage('Producto Agregado Satisfactoriamente!','success'); //success para que el mensaje seasatisfactorio, en bootstrap

     e.preventDefault(); //sin esto lo se puede ver bien el console log, ya que al ser formulario recarga rapido

  });
//accion para que boton eleiminar solo coja un producto, no toda la target 2//COLUM 2
document.getElementById('product-list').addEventListener('click',function(e){

  const ui= new UI();
  ui.deleteProdruct(e.target); //para que copruebe si le ha dado al boton eliminar , la funcion delete elimine
  ui.actionsMessage('Producto Borrado Satisfactoriamente', 'danger');
});







//la clase de interfaz estara interactuando con el html
//clase para la interfaz, donde creamos varios metodos,para que hagan funciones especificas
class UI{ 

  addProduct(product){
    const productList = document.getElementById('product-list'); //la segunda column del html product-list
    const element = document.createElement('div');//aqui crearemos un nuevo div en html para que vaya saliendo por pantalla los productos que se añaden
    
    element.innerHTML =` <div class='card text-center mb-4'> 
          <div class='card-body'>
             <strong>Product Name</strong>:${product.name}
             <strong>Product Price</strong>:${product.price}
             <strong>Product Year</strong>:${product.year}
             <a href='#'class='btn btn-danger' name='delete'>Delete</a> <!--boton para que bustrap lo detecte como tal--> 
          </div>    
    </div>
    `;
    productList.appendChild(element);
  
  }
   

//para que se resetee la info puesta en el cuadro del formulario
  resetForm(){
   document.getElementById('product-form').reset();

  }

  deleteProdruct(element){
     if (element.name==='delete'){
       element.parentElement.parentElement.parentElement.remove(); //parentElement devuelve el elemento padre del elemento especificado.para que no elimine todo el card, si no una por una
     }
  }
  
  //para mostrar un ensaje despues de cada accion
  actionsMessage(message,cssClass){
    const div= document.createElement('div'); //creo div con JS
    //le ponemos elemento al div , una clase
    div.className= `alert alert-${cssClass}`;
    //añadimos mensaje//AppendChild para agregar nuevos elementos a un documento existente
    div.appendChild(document.createTextNode(message));
    //seleccionamos donde queremos mostrar mensaje en el DOM//querySelector selectiona la parte que queremos usar
    const container = document.querySelector('.container');// el punto, para seleccionar por clase en lugar de por etiqueta.
    const app = document.querySelector('#APP');//para que este el mensaje en el contenedor pero antes de la app
    container.insertBefore(div,app);//insertamos en el contenedor mi nuevo div, pero antes de la app
    

    setTimeout(function(){
       document.querySelector('.alert').remove();
    }, 3000) //a los 3 segundos se eliminaran los alerts

  }
}


