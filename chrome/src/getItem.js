function getItem() {
    const title = document.querySelector('.pc .product-detail-desc-title span').textContent

    // サークル
    const circle = document.querySelector('.pc .product-detail-desc-sub .sub-circle a')
    const circleName = removeSpacePrefix(circle.textContent)
    const circleLink = circle.href

    // 作者
    const author = document.querySelector('.pc .product-detail-desc-sub .sub-name a')
    const authorName = removeSpacePrefix(author.textContent)
    const authorLink = author.href

    // 画像
    const imageArea = document.querySelector('.product-detail-image.main-image')
    const mainImageSrc = imageArea.querySelector('#preview a img').src
    const thumbsImgsNodes = imageArea.querySelectorAll('#thumbs div a img')
    const thumbsImgsSrc = []
    thumbsImgsNodes.forEach( img => {
        thumbsImgsSrc.push(img.src)
    })


    const item = {
        "contents": {
            "title": title,
            "link": {
                "toranoana": location.href
            },
            "image": {
                "main": mainImageSrc,
                "thumbs": thumbsImgsSrc
            }
        },
        "info": {
            "circle": {
                "name": circleName,
                "link": {
                    "toranoana": circleLink,
                }
            },
            "author": {
                "name": authorName,
                "link": {
                    "toranoana": authorLink,
                }
            }
        }
    }

    console.log(item)

    return item
}


/**
 * 頭と後に空白があれば削除
 * 
 * @param {string} text 
 * @return {string}
 */
function removeSpacePrefix(text) {
    if (text.charAt(0) === ' ') {
        text = text.slice(1, text.length)
    }

    if (text.charAt(text.length - 1) === ' ') {
        text = text.slice(0, text.length - 1)
    }

    return text
}

console.log('window ok')

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('受信')
	console.log(message)
    sendResponse(getItem())
    return true
})

