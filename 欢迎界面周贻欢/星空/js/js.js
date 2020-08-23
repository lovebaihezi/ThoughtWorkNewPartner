
			function starInit(starCount){
				const starArea = document.querySelector(".starArea");
				for (let i = 0; i < starCount; i++) {
					const star = document.createElement("div");
					star.classList.add("star");
					starArea.appendChild(star);
				}
			}
			// starInit();
			function starPosition(starCount){
				starInit(starCount);
				const stars = document.querySelectorAll(".star");
				console.log(stars);
				for (let i = 0; i < starCount; i++) {
					let left = Math.floor(Math.random() * window.innerWidth);
					let top = Math.floor(Math.random() * window.innerHeight/1.5);
					stars[i].style.left = left + 'px';
					stars[i].style.top = top + 'px';
					stars[i].style.animationDelay = Math.floor(Math.random().toFixed(1) * i) + 's';
				}
			}
			starPosition(100);

     
			window.onload=function(){
			  var odiv=document.getElementById("thediv");
			  function hidden(){
				odiv.style.display="none";
			  }
			  setTimeout(hidden,5000);
			  var sdiv=document.getElementById("choose");
			  function appear(){
				sdiv.style.display="block";
			  }
			  setTimeout(appear,5000);
			}
