<template>
 <section class="signup">
                <div class="container">
                    <div class="signup-content">
                            <div class="signup-form">
                                <h1 class="form-title">Welcome!</h1>
                                <h2>Registra il tuo account</h2>
                                <form method="POST" class="register-form" id="register-form">
                                    <div class="form-group">
                                        <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="name" id="name" placeholder="Nome utente" required/>
                                    </div>
                                    <div class="form-group">
                                        <label for="name"><i class="zmdi zmdi -email"></i></label>
                                        <input type="text" name="name" id="name" placeholder="La tua e-mail" required/>
                                    </div>
                                    <div class="form-group">
                                        <label for="name"><i class="zmdi zmdi-lock"></i></label>
                                        <input type="text" name="name" id="name" placeholder="La tua password" required/>
                                    </div>
                                    <div class="form-group">
                                        <label for="pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                        <input type="password" name="pass" id="pass" placeholder="Ripeti la tua password" required/>
                                    </div>
                                    <br>
                                    Hai già un account? 
                                    <a href= "#">Accedi</a>
                                    <br>
                                    <br>
                                
                                    <input type="submit" class="btn btn-outline-primary" value= "Registrati">
                                </form>
                        </div>
                    <div class="signup-image">
                        <figure><img src="man-working-vector.jpg" alt="sign up image"></figure>
                    </div>
                </div>
                </div>
        </section>
    
</template>

<script>
export default {
    name: 'signin',
}
</script>

<style>

</style>