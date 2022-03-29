var fill=document.querySelector("#fill");
var array=[];

const showVideos=async()=>{
    try{
        let res=await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=in&maxResults=50&key=AIzaSyC6ZfNTY3ByqYuvhsL7Ol9riY_fJyMHEZo`);
        let data=await res.json();
        let videos=data.items;
        appendVideos(videos);
        //console.log("data:",videos);


    }catch(err){
        console.log("err:",err);
    }
};
showVideos();

const appendVideos=(data)=>{
    fill.innerHTML=null;
    try{
        data.forEach(({snippet,id})=>{

            let div=document.createElement("div");
            
            let title=document.createElement("p");
            title.innerText=snippet.title;

            let iframe=document.createElement("iframe");
            iframe.src=`https://www.youtube.com/embed/${id}`;
            iframe.height="100%";
            iframe.width="100%";
            iframe.allow="fullscreen";

            div.append(iframe,title);
            fill.append(div);
        })
        }catch(err){
            console.log("err:",err);
        }
    }
const searchVideo=async()=>{
        try{
            let input=document.querySelector("#search").value ;
            let response=await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${input}&type=video&key=AIzaSyBEDiwCtSNuiVj9X5I5Be0WKiNsTFJ_TTs&maxResults=50&part=snippet`);
            let data=await response.json();
            appending(data.items);
            console.log(data.items);

        }catch(err){
            console.log(err);
        }
    }
    const appending=(data)=>{
        fill.innerHTML=null;
        try{
            data.forEach(({snippet,id:{videoId}})=>{
    
                let div=document.createElement("div");
                
                let title=document.createElement("p");
                title.innerText=snippet.title;
    
                // let iframe=document.createElement("iframe");
                // iframe.src=`https://www.youtube.com/embed/${videoId}`;
                // iframe.height="100%";
                // iframe.width="100%";
                // iframe.allow="fullscreen";

                let image=document.createElement("img");
                image.src=snippet.thumbnails.default.url;
                image.addEventListener("click",function(){
                    var array=[];
                    array.push(videoId,snippet.title);
                    localStorage.setItem("thumbnail",JSON.stringify(array));
                    console.log(array);
                    window.location.href="thumbnail.html";
                });

                
    
                div.append(image,title);
                fill.append(div);
            })
            }catch(err){
                console.log("err:",err);
            }
        }

        //[0].snippet.thumbnails.default
        
        
        

    