window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get("productId");
  this.productId = param;
  generatePage();
};

function generatePage() {

  var promise = axios({
    method: "GET",
    url: "https://shop.cyberlearn.vn/api/Product/getbyid",
    params: { id: this.productId },
  })
    .then(function (result) {  
      document.getElementById("page-path").innerHTML = generatePath(result.data.content);
      // Image Content
      var shoeImage = document.getElementById("shoe-image");
      shoeImage.style.backgroundImage = `url('${result.data.content.image}')`;
      //Shoe Info
      document.getElementById("shoe-info").innerHTML = generateShoeInfo(result.data.content);
      //Best Seller - Related product
      document.getElementById("best-seller-list").innerHTML = generateBestSeller(
        result.data.content
      );
    })
    .catch(function (err) {
      console.log(err);
    });
}

function generateShoeInfo(product) {
  var content = "";
  var upperPrice = (product.price * 110) / 100;

  content += `
            <h3 class="title">
                ${product.name}
            </h3>
            <h6 class="sub-title">
                What We Offer For You
            </h6>
            <div class="price">
                <div class="old-price">
                $${upperPrice}
                </div>
                <div class="active-price">
                $${product.price}
                </div>
            </div>
            <p class="my-2">
                ${product.description}
            </p>

            <div class="features">
                <h2> FEATURES </h2>
                <ul class="">
                <li>
                    <i class="fa fa-check"></i>
                    <span> ${product.shortDescription} </span>
                </li>
                <li>
                    <i class="fa fa-check"></i>
                    <span> A great journey: Various levels like hills, forests, volcanic landscapes and caves, each
                    presenting unique challenges;
                    </span>
                </li>
                </ul>
            </div>
            <div class="controller">
                <div class="quantity">
                <input type="number" class="form-control" id="numberInput" min="0" max="100" step="1">
                <div class="buttons">
                    <button type="button" class="btn btn-primary">+</button>
                    <button type="button" class="btn btn-primary">-</button>
                </div>
                </div>
                <button type="button" class="btn btn-primary">Add To Cart</button>
            </div>
            <div class="feedback">
                <i class="fa fa-heart"></i>
            </div>
            <div class="metadata">
            <span class="posted_in">
        <span>Categories:</span>
                ${generateCategories(product)}
        </span>
        </div>
          `;
  return content;
}

function generateCategories(product) {
  var category = "";
  for (let i = 0; i < product.categories.length; i++) {
    category += `
        <a href="https://kamleshyadav.com/templatemonster/shoestore/product-category/manoletinas/"
        rel="tag">${product.categories[i].category}</a>`;
  }
  return category;
}

function generateBestSeller(product) {
    var content = "";
    for (let i = 0; i < product.relatedProducts.length; i++) {
      var relatedProduct = product.relatedProducts[i];
      content += `
          <div class="product_item col-3">
            <div class="image">
                <img src="${relatedProduct.image}"/>
            </div>
              <div class="product_icon">
                  ${
                    relatedProduct.feature == true
                      ? '<div class="new_tag">NEW</div>'
                      : '<div class="new_tag" style="background-color:rgba(0, 0, 0, 0)"></div>'
                  }
                  <div class="icon">
                      <i class="fa-solid fa-cart-shopping btn" data-toggle="tooltip" data-placement="top" title="Cart"></i>
                      <i class="fa-regular fa-heart btn" data-toggle="tooltip" data-placement="top" title="Wishlist"></i>
                      <i class="fa-solid fa-magnifying-glass btn" data-toggle="tooltip" data-placement="top" title="View"></i>
                  </div>
              </div>
              <h4><a href="?productId=${relatedProduct.id}">${relatedProduct.name}</a></h4>
              <p>$${relatedProduct.price}</p>
          </div>
          `;
    }
    return content;
}

function generatePath(product) {
    var content = `
    <ul class="list-group list-group-horizontal list-group-item-dark">
    <li class="list-group-item first-item" href="#" >
          <a class="nav-link" href="./../../index.html">Home</a>
    </li>
    <li class="list-group-item">Shop</li>
    <li class="list-group-item">${product.name}</li>
    </ul>`;
 
    return content;
}