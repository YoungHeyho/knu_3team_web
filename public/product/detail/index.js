
// 상품 상세 페이지 렌더링
window.addEventListener("load", async () => {
    // 특정 상품 id 추출
    const pathname = window.location.href;
    const id = pathname.split("detail/?id=")[1];
    // console.log('id', id);

    try {
        // 백엔드로 상품 상세 데이터 요청
        const verifyResult = await fetch(`/api/product?id=${id}`, {
            method: "GET", // GET 요청
            headers: {
                "Content-Type": "application/json",
            },
        });

        // 응답 결과 확인
        if (!verifyResult.ok) {
            throw new Error('네트워크 응답이 좋지 않습니다.');
        }

        // json 형식으로 데이터 저장
        const productData = await verifyResult.json();
        // 상품 데이터가 존재하는 경우 렌더링
        console.log("productData.id: ", productData.id);
        console.log("productData: ", productData.data[id].productId);
        if (productData && productData.data[id].productId === parseInt(id)) { // id가 일치하는지 확인
            renderProductDetail(productData.data[id]);
        } else {
            console.error("상품을 찾을 수 없습니다.");
        }
    } catch (error) {
        console.error('Fetch 오류:', error);
    }

});

// 상품 상세 정보 렌더링 함수
function renderProductDetail(product) {
    const productListWrapper = document.getElementById("product-detail");
    const item = document.createElement("div");
    item.innerHTML = `
            <div>${product.title}</div>
            <div>가격: ${product.price}원</div>
            <div>[상세설명] ${product.description}</div>
            <div>
                <img src="${product.imgUrl}" />
            </div>
            <div>재고수량: ${product.stock}(개)</div>
        `;
    productListWrapper.append(item);
}

