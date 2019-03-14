const fs = require('fs')
const rl = require("readline-sync")
const axios = require("axios");
if(fs.exists("courses.json",(exists)=>{
    if(exists){
        var data=fs.readFileSync("courses.json")
        data=data.toString()
        var availableCourses=JSON.parse(data)
         var availablecourses = availableCourses["availableCourses"]
         let n=0;
         for(let i of availablecourses){
                console.log(n,i.name);
                n+=1;        
            }
            var input = rl.question("Enter your number");
            var id = availablecourses[input]["id"];
            console.log(id);
            axios
            .get("http://saral.navgurukul.org/api/courses/"+id+"/exercises")
            .then(response=>{
                var data1=(response.data);

                var data2 = data1["data"]
                // console.log(data2)
                let k=0;
                for(let i of data2){
                    console.log(k,i.name);
                    k+=1;
                    if(i["childExercises"].length>0){
                        var obj = i["childExercises"]
                        // console.log(obj);
                        let q=0;
                        for(let a of obj){
                            console.log("              ",k-1 +"."+q,a["name"]);
                            q+=1;
                        }  
                    }
                }
                var input1 = rl.question("Enter your number for the slug....");
                var input_list = input1.split(".");
                // console.log(input_list)
                if (input_list.length>1){
                	var slug1 = data2[input_list[0]]['childExercises'][input_list[1]]['slug']
                	console.log(slug1)
                }
                else{
                	var slug1 = data2[input_list[0]]['slug']
                	console.log(slug1)
                }                      
                var new_link = "http://saral.navgurukul.org/api/courses/"+id+"/exercise/getBySlug?slug="+slug1
                console.log(new_link)              
            })
    }
}));
else{
axios.get("http://saral.navgurukul.org/api/courses")

.then(response=>{
    // console.log(response.data);
    fs.writeFileSync("courses.json",JSON.stringify(response.data,null,2))
    
})

.catch(function(error) {
    console.log("code is not right at all");
  });
}
