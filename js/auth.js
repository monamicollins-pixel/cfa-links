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
                document.getElementById("firstName")?.value.trim() || "";

            const email =
                document.getElementById("email")?.value.trim().toLowerCase() || "";

            const password =
                document.getElementById("password")?.value || "";

            const confirm =
                document.getElementById("confirmPassword")?.value || "";

            /*
             * CFA — FIRST NAME VALIDATION
             *
             * Accept international names while blocking
             * numbers, emojis, URLs and obvious junk.
             */

            const firstNamePattern =
                /^[\p{L}]+(?:[ .'-][\p{L}]+)*$/u;

            const blockedNames = [
                "test",
                "testing",
                "admin",
                "administrator",
                "asdf",
                "qwerty",
                "xxx",
                "xxxx",
                "none",
                "null",
                "anonymous",
                "unknown"
            ];

            const normalizedName =
                name
                    .normalize("NFKC")
                    .trim();

            const normalizedNameLower =
                normalizedName.toLocaleLowerCase();


            if (!name || !email || !password || !confirm) {
                authMessage(
                    "Veuillez remplir tous les champs.",
                    "error"
                );
                return;
            }

            if (!normalizedName) {
                authMessage(
                    "Veuillez saisir votre prénom.",
                    "error"
                );
                return;
            }

            if (
                normalizedName.length < 2 ||
                normalizedName.length > 40
            ) {
                authMessage(
                    "Votre prénom doit contenir entre 2 et 40 caractères.",
                    "error"
                );
                return;
            }

            if (!firstNamePattern.test(normalizedName)) {
                authMessage(
                    "Veuillez saisir un prénom valide.",
                    "error"
                );
                return;
            }

            if (blockedNames.includes(normalizedNameLower)) {
                authMessage(
                    "Veuillez saisir votre vrai prénom.",
                    "error"
                );
                return;
            }

            if (!email || !password || !confirm) {
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
                                first_name: name
                            },

                            emailRedirectTo:
                                window.location.origin +
                                "/cfa-links/pages/connexion.html"
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
                        "../dashboard.html";

                }, 500);

            } catch (error) {

                console.error("CFA login error:", error);

                authMessage(
                    "Erreur : " + (error?.message || "Connexion impossible."),
                    "error"
                );

                console.error("SUPABASE LOGIN ERROR:", {
                    message: error?.message,
                    status: error?.status,
                    code: error?.code
                });
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
                    user.user_metadata?.first_name ||
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
     * CFA — UNIVERSAL PASSWORD TOGGLE
     * ==============================
     */

    const passwordToggles =
        document.querySelectorAll("[data-password-toggle], #togglePassword");

    passwordToggles.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const field =
                button.closest(
                    ".password-wrap, .password-wrapper"
                )?.querySelector("input");

            if (!field) return;

            const visible = field.type === "text";

            field.type = visible ? "password" : "text";

            button.textContent = "👁️";

            button.setAttribute(
                "aria-label",
                visible
                    ? "Afficher le mot de passe"
                    : "Masquer le mot de passe"
            );

        });

    });

});
