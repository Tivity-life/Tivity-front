<!--Pagina di Login-->
<template>
        <div class="container  mt-5">
            <div class="signup-content">
                    <div class="signup-form">
                        <h1 class="form-title">Bentornato!</h1>
                        <form method="POST" class="register-form" id="register-form">
                            <div class="form-group">
                                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="name" placeholder="Nome utente o e-mail" required/>
                            </div>
                            <div class="form-group">
                                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="pass" id="pass" placeholder="Password" required/>
                            </div>
                            <a href= "#">Hai dimenticato la tua password?</a>
                            <br>
                            <br>
                            <div class="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                <label for="agree-term" class="label-agree-term"><span><span></span></span>Ricordami</label>
                            </div>
                            <input type="submit" class="btn btn-outline-primary" value= "Accedi">
                        </form>
                </div>
            <div class="signup-image">
                <figure><img src="../../assets/logo.jpeg" alt="sign up image"></figure>
            </div>
        </div>
        </div>
</template>

<script>
export default {
    name: "login",
}
</script>

<style>

</style>