function showSignUp() {
  document.getElementById("signupForm").classList.add("active");
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("forgotPasswordForm").classList.remove("active");

  const imageContent = document.querySelector(".image-content");
  imageContent.innerHTML = `
        <h2> Hello, Friend!</h2>
        <p>Enter your personal details and start your journey with us</p>
    `;
}

function showLogIn() {
  document.getElementById("loginForm").classList.add("active");
  document.getElementById("signupForm").classList.remove("active");
  document.getElementById("forgotPasswordForm").classList.remove("active");

  const imageContent = document.querySelector(".image-content");
  imageContent.innerHTML = `
        <h2> Hello, Friend!</h2>
        <p>Enter your personal details and continue your journey with us</p>
    `;
}

function showForgotPassword() {
  document.getElementById("forgotPasswordForm").classList.add("active");
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("signUpForm").classList.remove("active");
 

  const imageContent = document.querySelector(".image-content");
  imageContent.innerHTML = `
        <h2> Hello, Friend!</h2>
        <p>Enter your personal details and start your journey with us</p>
    `;
}

document.getElementById('loginFormSubmit').addEventListener('submit', function(e){
    e.preventDefault();
    handleFormSubmit(this, 'Signing in...')

})

document.getElementById('signupFormSubmit').addEventListener('submit', function(e){
    e.preventDefault();
    if (validateSignUpForm()) {
        handleFormSubmit(this, 'Creating account...')
    }
})

document.getElementById('forgotPasswordFormSubmit').addEventListener('submit', function(e){
    e.preventDefault();
    handleFormSubmit(this, 'Sending instructions...')
    
})

function validateSignUpForm() {
    const password = document.getElementById("pass").value
    const confirmPassword = document.getElementById("confirmPass").value

    if(password.length >= 8 && password === confirmPassword) {
        return true
    }
    else {
        alert("Make sure your passwords are at least 8 characters and match")
        return false
    }

}

function handleFormSubmit(form, loadingText) {
    const button = form.querySelector('.btn-primary');
    const loading = button.querySelector('.loading');
    const btnText = button.querySelector('.btn-text');
    const originalText = btnText.textContent;

    loading.classList.add('show')
    btnText.textContent = loadingText
    button.disabled = true

    setTimeout(() => {
        loading.classList.remove('show');
        button.disabled = false
        btnText.textContent = originalText

        if(form.id ==='loginFormSubmit') {
            showSuccessMessage('Login Successful. Redirecting...')
        }
        else if(form.id ==='signupFormSubmit'){
            showSuccessMessage('Account created successfully! Please check your email')
        }
        else if (form.id === "forgotPasswordFormSubmit") {
            showSuccessMessage('Password reset instructions sent to your email')
        }

    }, 2000)
}


function showSuccessMessage(message) {
    const notification = document.createElement('div')
    notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: rgb(0, 255, 132);
    color: white;
    padding: 16px 24px;
    border-radius:12px ;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(16,185, 129, 0.3);
    z-index: 1000;
    animation: slideInRight 0.5s ease;
    `

    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
        notification.remove()
    }, 5000);
}

function socialLogin(provider) {
    const providerName = provider.charAt(0).toUpperCase() + provider.slice(1)
    showSuccessMessage(`${providerName} login initiated!`)
}

document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentNode.querySelector('i').style.color = '#3b82f6'
        this.classList.add('focused')
    })

     input.addEventListener('blur', function() {
        if(!this.value) {
            this.parentNode.querySelector('i').style.color = '#94a3b8'
        }
        this.classList.remove('focused')
    })

    input.addEventListener('input', function() {
        if(this.type === 'email') {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)
            this.classList.toggle('success', isValid && this.value.length > 0) 
            this.classList.toggle('error', !isValid && this.value.length > 0)
        }
    })
})

window.addEventListener('load', function() {
    this.document.querySelector('.container').style.animation = 'fadeIn 1s ease'
})

document.addEventListener('keydown', function(e) {
    if(e.altkey && e.key == 's') {
        e.preventDefault();
        showSignUp();
    }
    else if(e.altkey && e.key == 'l') {
        e.preventDefault();
        showLogIn();
    }
})