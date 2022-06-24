<h1> JWT-Authentication </h1>
<h3>FOR SIGNUP: </h3><br> 
User will provide an email and password that has 6 or more characters in it. The application will authenticate user's email and password. Application will
validate if user with email doesn't already exist. It will hash the password. Save user to DB then send a jwt.
<h3>FOR LOGIN: </h3><br> 
User will provide an email and password then it will get user's particular email. Compare hashed password to password provided. If everything is correct the
user will get the token (JWT)
Protecting certain routes with middleware: The user that is authenticated will be able to either have one that could access to and the other only if is authenticated to
