//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash')

const homeStartingContent = "Hundreds of firefighters in California are battling the largest wildfire to spread in the state so far this year.The McKinney Fire, which started in the northern Siskiyou county on Friday, has already burnt 21,000 hectares (52,500 acres), the state's fire service said.At least 2,000 residents as well as trekkers on the Pacific Crest hiking trail have left the area, authorities say. Homes have been destroyed.It was 0% contained as of Sunday, the emergency service's latest report said.A red flag warning indicating the threat of dangerous fire conditions is in place, as California suffers from persistent drought conditions.A state of emergency was declared in Siskiyou county on Saturday, after homes were destroyed and infrastructure was threatened, state governor Gavin Newsom said.The fire was intensified and spread by dry fuels, extreme drought conditions, high temperatures, winds and lightning storms";
const aboutContent = "Hi, I’m M Hashim khan and I am a Full-stack Web Developer. It's been 1 years, I’m working as a full-stack web developer. I have developed many websites.";
const contactContent = "I will add my contact as soon as possible here.";

const app = express();

app.set('view engine', 'ejs');

let posts = []

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , (req , res) => {
  res.render('home', {homePara : homeStartingContent , post : posts})
  // console.log(posts)

})

app.get("/about" , (req , res) => {
  res.render('about' , {aboutText : aboutContent})
})
app.get("/contact" , (req , res) => {
  res.render('contact' , {contactText : contactContent})
})

app.get("/compose" , (req , res) => {
  res.render('compose')

})

app.post("/compose" , (req , res) => {
  const postData = {
    title : req.body.postTitile,
    content : req.body.PostBody
  }
  posts.push(postData)

  res.redirect('/')

})

app.get("/post/:blogname" , (req , res) => {
  const requestedTitle = _.lowerCase(req.params.blogname);
  
  posts.forEach((post) => {
    let storedTitle = _.lowerCase(post.title)

    if(storedTitle === requestedTitle){
      console.log("match found")
      res.render("post" , {title : post.title , content : post.content })
      // res.redirect('/post')
    }
  })
})







app.listen(3000, function() {
  console.log("Server started on port 3000");
});




// <!-- <% for(let i = 0; i < homepara.length; i++){ %>
  // <p> <%= homePara[i] %> </p>
// <% } %>


// <% post.map((data) => { %>
//   <p><%= data.title</p> %>
//   <p><%= data.content</p> %>

// <% }) %>