let star_rate = 1;
let vote_count = 1488;
let vote_rate = 8.289;
let new_rate = (vote_rate * vote_count + star_rate) / (vote_count + 1); 
console.log(new_rate)
console.log(Math.round(new_rate * 1000) / 1000)
console.log(new Date().toISOString().slice(0, 10));