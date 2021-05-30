import { toast } from "materialize-css/dist/js/materialize.min";

export default {
  install(app, options) {
    app.config.globalProperties.$message = function (html) {
      toast({ html });
    };

    app.config.globalProperties.$error = function (html) {
      toast({ html: `[ERROR] ${html}` });
    };
  },
};
