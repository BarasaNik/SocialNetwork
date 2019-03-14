function enterUser(){
	//считываем логин
	var login=document.getElementById("login").value
	//считываем пароль
	var password=document.getElementById("password").value
	alert(login+' '+password);
	//проверяем правильность введенных данных
	if (login=='admin' && MD5(password)==MD5('admin'))
		alert('Успешный вход');
	else alert('Неверный логин или пароль');
}