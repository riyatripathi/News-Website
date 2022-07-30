baseURL = 'https://news-api-call.herokuapp.com/news/'
let news = document.getElementById('news');
let mainImg = document.getElementById('mainImg');
let maini = document.getElementById('maini');
let newsExtra = document.getElementById('newsExtra');
let spinner = document.getElementById('spinner');
let content = document.getElementById('content');
let search = document.getElementById('search');

search.addEventListener('click',function(e){
	e.preventDefault();
	searchkro();
});

content.style.display="none";
body();
async function body(){
	let data = await fetch(baseURL);
	data = await data.json();
	data = JSON.parse(data);
	if(data.status == "ok"){
 		let html = ``;
 		let html2 = mainImg.innerHTML;
 		let html3 = newsExtra.innerHTML;
 		let articles = data.articles;
 		let images = [];
 		articles.forEach(function(element,index){
 			if(element.urlToImage!=null){
 				images.push(element.urlToImage);
 			}
 		});
 		articles.forEach(function(element,index){
 			if(element.urlToImage!=null && element.content!=null){
 				maini.src = images[Math.floor(Math.random()*images.length)];
 				text = element.content;
				if(element.content == ""){ text = element.description; }
				let datestring = element.publishedAt;
				let inx = datestring.indexOf('T');
				let date = datestring.substring(0,inx);
				let time = datestring.substring(inx+1,datestring.length-1); 
 				html += `<div class="col">
					             <div class="card my-2" style="width: 18rem;">
					              <img src="${element.urlToImage}" class="card-img-top" alt="Image">
					              <div class="card-body">
					                <h5 class="card-title">${element.title}</h5>
					                <p class="card-text">${text}</p>
					                <a href="${element.url}" class="btn btn-link">Read More</a>
					                <h5>Source: <span class="badge bg-secondary">${element.source.name}</span></h5>
					                <p>Published At: ${date}<br>Time: ${time}</p>
					              </div>
					            </div>
					        </div>`;
				html2 += ` <div class="carousel-item">
                				<img src="${element.urlToImage}" class="d-block w-100 filt" alt="Image">
                				<div class="carousel-caption d-none d-md-block" style="background-color:rgba(60, 60, 60, 0.6);padding:5px;box-shadow:2px 3px 5px #000;">
        							<h5>${element.title}</h5>
        							<p>Rapid News</p>
      							</div>
             			   </div>`;
 			}else{
 				let text = "";
 				if(element.description == null || element.description == ""){
 					if(element.content == "" || element.content == null) text = "";
 					else text = element.content;
 				} 
 				html3 += `
 					<div class="accordion-item">
		              <h2 class="accordion-header" id="flush-heading${index}">
		                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
		                  ${element.title}
		                </button>
		              </h2>
		              <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}" data-bs-parent="#newsExtra">
		                <div class="accordion-body">${text} <a href="${element.url}" class="btn btn-link">Read Here</a>
					                <h4>Source: <span class="badge bg-secondary">${element.source.name}</span></h4></div>
					                <p>Published At: ${element.publishedAt}</p>
		              </div>
		            </div>
 				`;
 			}
 		});
 		news.innerHTML = html;
 		mainImg.innerHTML = html2;
 		newsExtra.innerHTML = html3;
 		spinner.style.display = 'none';
 		content.style.display = 'block';
 	}else{
 		// alert(data.code);
 		// alert(data.messgae);
 	}
 	spinner.style.display = 'none';
	content.style.display = 'block';
}



async function searchkro(){
	let query = document.getElementById('searchvalue').value;
	content.style.display="none";
	spinner.style.display = 'block';
	news.innerHTML = '';
	let baseURL2 = `https://news-api-local.herokuapp.com/news/search/${query}`;
    let data = await fetch(baseURL2);
	data = await data.json();
	data = JSON.parse(data);
 	if(data.status == "ok"){
 		let html = ``;
 		mainImg.innerHTML = '';
 		mainImg.innerHTML = `<div class="carousel-item active">
                				<img id="maini" class="d-block w-100 filt" alt="Image">
              				 </div>`;
        newsExtra.innerHTML = ``;
 		let html2 = mainImg.innerHTML;
 		let html3 = newsExtra.innerHTML;
 		let articles = data.articles;
 		let images = [];
 		articles.forEach(function(element,index){
 			if(element.urlToImage!=null){
 				images.push(element.urlToImage);
 			}
 		});
 		articles.forEach(function(element,index){
 			if(element.urlToImage!=null && element.content!=null){
 				maini.src = images[Math.floor(Math.random()*images.length)];
 				text = element.content;
				if(element.content == ""){ text = element.description; }
				let datestring = element.publishedAt;
				let inx = datestring.indexOf('T');
				let date = datestring.substring(0,inx);
				let time = datestring.substring(inx+1,datestring.length-1); 
 				html += `<div class="col">
					             <div class="card my-2" style="width: 18rem;">
					              <img src="${element.urlToImage}" class="card-img-top" alt="Image">
					              <div class="card-body">
					                <h5 class="card-title">${element.title}</h5>
					                <p class="card-text">${text}</p>
					                <a href="${element.url}" class="btn btn-link">Read More</a>
					                <h5>Source: <span class="badge bg-secondary">${element.source.name}</span></h5>
					                <p>Published At: ${date}<br>Time: ${time}</p>
					              </div>
					            </div>
					        </div>`;
				html2 += ` <div class="carousel-item">
                				<img src="${element.urlToImage}" class="d-block w-100 filt" alt="Image">
                				<div class="carousel-caption d-none d-md-block" style="background-color:rgba(60, 60, 60, 0.6);padding:5px;box-shadow:2px 3px 5px #000;">
        							<h5>${element.title}</h5>
        							<p>Rapid News</p>
      							</div>
             			   </div>`;
 			}else{
 				let text = "";
 				if(element.description == null || element.description == ""){
 					if(element.content == "" || element.content == null) text = "";
 					else text = element.content;
 				} 
 				html3 += `
 					<div class="accordion-item">
		              <h2 class="accordion-header" id="flush-heading${index}">
		                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
		                  ${element.title}
		                </button>
		              </h2>
		              <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}" data-bs-parent="#newsExtra">
		                <div class="accordion-body">${text} <a href="${element.url}" class="btn btn-link">Read Here</a>
					                <h4>Source: <span class="badge bg-secondary">${element.source.name}</span></h4></div>
					                <p>Published At: ${element.publishedAt}</p>
		              </div>
		            </div>
 				`;
 			}
 		});
 		news.innerHTML = html;
 		mainImg.innerHTML = html2;
 		newsExtra.innerHTML = html3;
 		spinner.style.display = 'none';
 		content.style.display = 'block';
 	}else{
			// alert(data.code);
			// alert(data.messgae);
	}
}
