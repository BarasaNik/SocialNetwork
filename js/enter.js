function enterUser(){
	//считываем логин
	var login=document.getElementById("login").value
	//считываем пароль
	var password=document.getElementById("password").value
	//проверяем правильность введенных данных
	if (login=='admin' && MD5(password)==MD5('admin')){
		alert('Успешный вход');
		// закрываем текущую вкладку
		window.close('index.html');
		//открываем новую
		window.open('main.html');
	}
	else alert('Неверный логин или пароль');
}