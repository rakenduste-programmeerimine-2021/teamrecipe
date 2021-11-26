const router = require("express").Router()
const authController = require("../controllers/auth");
const validationMiddleware = require("../middleware/validationMiddleware");
const { check } = require("express-validator");

router.post(
    "/login",
    [
        check("userName")
        .isLength({ min: 6 })
        .withMessage("Must be at least 6 characters long"),
        check("password")
        .isLength({ min: 6 })
        .withMessage("Must be at least 6 characters long"),
    ],
    validationMiddleware,
    authController.login
);

router.get(
    "/:userName",
    authController.getUser
);

router.post(
    "/signup",
    [
        check("firstName")
        .isLength({ min: 3 })
        .withMessage("Must be at least 3 characters long")
        .trim()
        .exists()
        .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
        .withMessage("Must be alphabetic"),
        check("lastName")
        .isLength({ min: 3 })
        .withMessage("Must be at least 3 characters long")
        .trim()
        .exists()
        .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
        .withMessage("Must be alphabetic"),
        check("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Must be correctly formatted e-mail"),
        check("password")
        .isStrongPassword({minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0})
        .withMessage("The password is not strong enough"),
        check("passwordConfirmation")
        .escape()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }

            return true;
        })
    ],
    validationMiddleware,
    authController.signup
);

module.exports = router;