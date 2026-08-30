function authMessage(text, type) {
    const box = document.getElementById("authMessage");

    if (!box) return;

    box.textContent = text;
    box.className = "auth-message " + type;
}

document.addEventListener("DOMContentLoaded", async function () {

    /*
     * ==============================
     * CFA — SIGN UP
     * ==============================
     */

    const signup = document.getElementById("signupForm");

    if (signup) {

        signup.addEventListener("submit", async function (e) {

            e.preventDefault();

            const name =
                document.getElementById("name")?.value.trim() || "";

            const email =
                document.getElementById("email")?.value.trim().toLowerCase() || "";

            const password =
                document.getElementById("password")?.value || "";

            const confirm =
                document.getElementById("confirmPassword")?.value || "";

            if (!name || !email || !password || !confirm) {
                authMessage(
                    "Veuillez remplir tous les champs.",
                    "error"
                );
                return;
            }

            if (password.length < 6) {
                authMessage(
                    "Le mot de passe doit contenir au moins 6 caractères.",
                    "error"
                );
                return;
            }

            if (password !== confirm) {
                authMessage(
                    "Les mots de passe ne correspondent pas.",
                    "error"
                );
                return;
            }

            authMessage(
                "Création de votre compte...",
                "success"
            );

            try {

                const { data, error } =
                    await cfaSupabase.auth.signUp({

                        email: email,

                        password: password,

                        options: {
                            data: {
                                full_name: name
                            },

                            emailRedirectTo:
                                window.location.origin +
                                "/pages/connexion.html"
                        }
                    });

                if (error) {
                    throw error;
                }

                /*
                 * Supabase may return a user with
                 * an empty session when email confirmation
                 * is enabled.
                 */

                if (data.user && !data.session) {

                    authMessage(
                        "Compte créé ! Consultez votre e-mail pour confirmer votre adresse.",
                        "success"
                    );

                    return;
                }

                authMessage(
                    "Compte créé avec succès !",
                    "success"
                );

                setTimeout(function () {
                    window.location.href =
                        "espace-etudiant.html";
                }, 800);

            } catch (error) {

                console.error("CFA signup error:", error);

                authMessage(
                    error.message ||
                    "Impossible de créer le compte.",
                    "error"
                );
            }

        });
    }


    /*
     * ==============================
     * CFA — LOGIN
     * ==============================
     */

    const login = document.getElementById("loginForm");

    if (login) {

        login.addEventListener("submit", async function (e) {

            e.preventDefault();

            const email =
                document.getElementById("email")?.value.trim().toLowerCase() || "";

            const password =
                document.getElementById("password")?.value || "";

            if (!email || !password) {

                authMessage(
                    "Veuillez saisir votre e-mail et votre mot de passe.",
                    "error"
                );

                return;
            }

            authMessage(
                "Connexion en cours...",
                "success"
            );

            try {

                const { data, error } =
                    await cfaSupabase.auth.signInWithPassword({

                        email: email,
                        password: password

                    });

                if (error) {
                    throw error;
                }

                if (!data.user) {

                    authMessage(
                        "Connexion impossible.",
                        "error"
                    );

                    return;
                }

                authMessage(
                    "Connexion réussie !",
                    "success"
                );

                setTimeout(function () {

                    window.location.href =
                        "espace-etudiant.html";

                }, 500);

            } catch (error) {

                console.error("CFA login error:", error);

                authMessage(
                    "E-mail ou mot de passe incorrect.",
                    "error"
                );
            }

        });
    }


    /*
     * ==============================
     * CFA — ACCOUNT AREA
     * ==============================
     */

    const area =
        document.getElementById("accountArea");

    if (area) {

        try {

            const {
                data: { user }
            } = await cfaSupabase.auth.getUser();

            if (user) {

                const name =
                    user.user_metadata?.full_name ||
                    user.email ||
                    "Apprenant";

                area.innerHTML =
                    '<span class="user-welcome">Bonjour, ' +
                    name +
                    '</span>' +
                    '<button class="logout-btn" id="logoutBtn">' +
                    'Déconnexion' +
                    '</button>';

                const logoutBtn =
                    document.getElementById("logoutBtn");

                if (logoutBtn) {

                    logoutBtn.addEventListener(
                        "click",
                        async function () {

                            await cfaSupabase.auth.signOut();

                            window.location.reload();

                        }
                    );
                }
            }

        } catch (error) {

            console.error(
                "CFA account error:",
                error
            );
        }
    }


    /*
     * ==============================
     * CFA — PASSWORD TOGGLE
     * ==============================
     */

    const passwordToggles =
        document.querySelectorAll(
            "[data-password-toggle], #togglePassword"
        );

    passwordToggles.forEach(function (button) {

        button.addEventListener("click", function () {

            const field =
                button.closest(
                    ".password-wrap, .password-wrapper"
                )?.querySelector("input");

            if (!field) return;

            field.type =
                field.type === "password"
                    ? "text"
                    : "password";

        });

    });

});
