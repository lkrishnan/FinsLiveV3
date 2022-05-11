import Vue from "vue"
import Vuetify from "vuetify/lib/framework"
import colors from "vuetify/lib/util/colors"

Vue.use( Vuetify )

export default new Vuetify( {
    theme: {
        themes: {
            light: {
                primary: colors.green.darken4,
                secondary: colors.grey.white,
                accent: colors.grey.lighten2,
                info: colors.grey.white,
                error: colors.red.accent3,
                background: colors.white
            },
            dark: {
                primary: colors.blue.lighten3,
                background: "#00a86b"
            },
        
        },

    },

} )