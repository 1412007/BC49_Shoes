var arrIdList = [
  "id",
  "name",
  "alias",
  "price",
  "description",
  "size",
  "shortDescription",
  "quantity",
  "deleted",
  "categories",
  "relatedProducts",
  "feature",
  "image",
];

function getNewProduct() {
  var promise = axios({
    method: "GET",
    url: "https://shop.cyberlearn.vn/api/Product",
  })
    .then(function (result) {
      document.getElementById("newProduct").innerHTML = renderUI(
        result.data.content,
        4
      );
    })
    .catch(function (err) {
      console.log(err);
    });
}
getNewProduct();

function getPopularProduct() {
  var promise = axios({
    method: "GET",
    url: "https://shop.cyberlearn.vn/api/Product",
  })
    .then(function (result) {
      document.getElementById("popularProduct").innerHTML = renderUI(
        result.data.content,
        8
      );
    })
    .catch(function (err) {
      console.log(err);
    });
}
getPopularProduct();

function renderUI(arrProduct, length) {
  var content = "";
  for (let i = 0; i < length; i++) {
    var product = arrProduct[i];
    content += `
        <div class="product_item col-lg-3 col-md-6 col-12">
            <a href="./detailPage/view/detail.html?productId=${
              product.id
            }"><img src="${product.image}"/></a>
            <div class="product_icon">
                ${
                  product.feature == true
                    ? '<div class="new_tag">NEW</div>'
                    : '<div class="new_tag" style="background-color:white"></div>'
                }
                <div class="icon">
                    <i class="fa-solid fa-cart-shopping btn" data-toggle="tooltip" data-placement="top" title="Cart"></i>
                    <i class="fa-regular fa-heart btn" data-toggle="tooltip" data-placement="top" title="Wishlist"></i>
                    <i class="fa-solid fa-magnifying-glass btn" data-toggle="tooltip" data-placement="top" title="View"></i>
                </div>
            </div>
            <h4><a href="./detailPage/view/detail.html?productId=${
              product.id
            }">${product.name}</a></h4>
            <p>$${product.price}</p>
        </div>
        `;
  }
  return content;
}
