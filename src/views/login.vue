<template>
    <div class="login">
        <div class="header">
            <div class="logo">
                <img src="../assets/logo.png" alt="EZLOT">
            </div>
            <!-- <div class="changelanguage">
                <a href="#" @click="ChangeLanguage('zh')">中</a>
                <span>/</span>
                <a href="#" @click="ChangeLanguage('en')">EN</a>
            </div> -->
        </div>
        <div class="box">
            <span class="title">{{ $t('pagelogin.title') }}</span>
            <div class="input-box" :class="{ 'error': usernameerror }">
                <span>{{ $t('pagelogin.username') }}</span>
                <input type="text" v-model="username" />
                <span class="error" v-if="usernameerror">{{ $t('pagelogin.error2') }}</span>
            </div>
            <div class="input-box" :class="{ 'error': passworderror }">
                <div class="password">
                    <span>{{ $t('pagelogin.password') }}
                    </span>
                    <a href="#">{{ $t('pagelogin.forgot') }}
                    </a>
                </div>
                <input type="password" v-model="password" />
                <span class="error" v-if="passworderror">{{ $t('pagelogin.error3') }}</span>
            </div>
            <!-- <div class="remember" @click="ChangeRemember">
                <span class="iconfont" :class="isremember?'icon-checkbox-checked':'icon-checkbox-unchecked'"></span>
                <span class="remembertext no-select">{{ $t('pagelogin.remember') }}</span>
            </div> -->
            <button class="btn btn-primary" @click="login">{{ $t('pagelogin.login') }}</button>
        </div>
        <div v-if="false" class="register" v-html="$t('pagelogin.register')">
        </div>
        <div class="footer" v-html="$t('page.footer')"></div>
    </div>
</template>

<script>
import AuthService from '@/services/authService';
import { checkIfUserIsAuthenticated } from '../utils/auth.js';
export default {
    name: 'LoginView', // This is the name of the component
    data() {
        return {
            username: '',
            usernameerror: false,
            password: '',
            passworderror: false,
            isremember: false,
            serviceClass: null
        };
    },
    mounted() {
        if (checkIfUserIsAuthenticated()) {
            this.$router.push({ path: "/index" });
        }
        // This is called when the component is ready
        this.serviceClass = new AuthService();
    },
    methods: {
        login() {

            this.serviceClass.login({ username: this.username, password: this.password, client: "2" }).then(loginSuccess => {
                if (loginSuccess) {
                    //跳转到index
                    this.$router.push({ path: "/index" });
                }
            }).catch(err => {
                console.log(err);
                this.$buefy.toast.open({
                    message: err,
                    type: 'is-danger'
                });
            })
            // Perform login logic here
            // You can use this.mail and this.password to access the entered values
        },
        ChangeLanguage(lang) {
            this.$i18n.locale = lang;
        },
        ChangeRemember() {
            this.isremember = !this.isremember;
        }
    }
};
</script>

<style lang="scss">
.login {
    max-width: 542px;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .header {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .logo {
            img {
                width: 43px;
            }
        }

        .changelanguage {
            color: $font-secondary-color;

            a {
                color: $font-secondary-color;
                text-decoration: none;
                font-size: 14px;
                font-weight: 500;
                margin: 0 3px;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    .box {
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.12), 0px 15px 35px rgba(60, 66, 87, 0.08);
        padding: 48px 68px;
        border-radius: 4px;

        .title {
            font-size: 22px;
            font-weight: bold;
            color: $font-primary-color;
            margin-bottom: 24px;
            display: block;
        }

        .input-box {
            margin-bottom: 24px;

            span {
                font-size: 14px;
                font-weight: 500;
                color: $font-primary-color;
            }

            .password {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
            }

            input {
                width: 100%;
                height: 48px;
                margin-top: 10px;
                border-radius: 4px;
                border: 1px solid #D9DCE1;
                padding: 0 16px;
                font-size: 14px;
                font-weight: 500;
                color: $font-primary-color;
                outline: none;
                transition: all 0.3s ease-in-out;

                &:focus {
                    border-color: $base-color;
                    border-width: 3px;
                }
            }

            &.error {
                span {
                    color: $error-color;
                }

                input {
                    border-color: $error-color;
                }
            }

            .error {
                font-size: 12px;
                font-weight: 500;
                color: $error-color;
                display: block;
                margin-top: 8px;
            }
        }

        .remember {
            display: flex;
            align-items: center;
            margin-bottom: 24px;

            .iconfont {
                font-size: 16px;
                color: $font-primary-color;

                &.icon-checkbox-checked {
                    color: $base-color;
                }
            }

            .remembertext {
                font-size: 14px;
                font-weight: 500;
                color: $font-primary-color;
                margin-left: 8px;
            }
        }

        .btn {
            width: 100%;
            height: 46px;
            font-size: 16px;
            font-weight: bold;
        }
    }

    .register {
        margin-top: 32px;
        font-size: 14px;
        font-weight: 500;
        color: $font-secondary-color;

        .regtext {
            text-decoration: none;
            margin-left: 4px;
            color: $base-color !important;
            font-weight: bold;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .footer {
        margin-top: 16px;
        font-size: 14px;
        font-weight: 500;
        padding: 0 !important;
        background-color: transparent !important;
        color: $font-secondary-color;

        a {
            text-decoration: none;
            color: $font-secondary-color;
            font-weight: bold;

            &:hover {
                cursor: pointer;
                color: $base-color;
            }
        }
    }
}
</style>
