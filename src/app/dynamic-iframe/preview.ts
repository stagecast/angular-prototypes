export let preview = `<!DOCTYPE html>
<html>
<body>

<h2>$formTitle</h2>

<form action="">
  First name:<br>
  <input type="text" name="firstname" value="$firstname">
  <br>
  Last name:<br>
  <input type="text" name="lastname" value="$lastname">
  <br><br>
</form> 

<input type="button" value="Trigger Action" id="action">
<div id="hacked" >Hacked? false</div>

<p>The form is inside an iframe. An iframe can be considered a safe environment as the js code cannot access the parent. It can access the localhost though...</p>

<p>You can set the text here: <span style="background: yellow">$text</span> </p>
<script>

document.getElementById("action").addEventListener("click", function(){
    console.log("Action triggered");
    document.getElementById("hacked").innerHTML = "Hacked? true";
});
</script>
</body>
</html>`; 