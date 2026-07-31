# Frappe Inspector Report

- Mode: scan
- License: community
- Errors: 47
- Warnings: 5
- Risky migrations: 0
- Needs review: 0

## Errors

- **FI010** Unknown DocType "Web Form". (payments/overrides/payment_webform.py:68)
- **FI010** Unknown DocType "Payment Request". (payments/payment_gateways/doctype/braintree_settings/braintree_settings.py:281)
- **FI010** Unknown DocType "Payment Request". (payments/payment_gateways/doctype/gocardless_settings/gocardless_settings.py:203)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/mpesa_settings/mpesa_settings.py:161)
- **FI010** Unknown DocType "POS Invoice". (payments/payment_gateways/doctype/mpesa_settings/mpesa_settings.py:187)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/mpesa_settings/mpesa_settings.py:213)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/mpesa_settings/mpesa_settings.py:275)
- **FI010** Unknown DocType "Payment Gateway Account". (payments/payment_gateways/doctype/mpesa_settings/mpesa_settings.py:340)
- **FI010** Unknown DocType "Mode of Payment". (payments/payment_gateways/doctype/mpesa_settings/mpesa_settings.py:364)
- **FI010** Unknown DocType "POS Opening Entry". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:50)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:67)
- **FI010** Unknown DocType "Payment Gateway Account". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:100)
- **FI010** Unknown DocType "Account". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:102)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:128)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:139)
- **FI010** Unknown DocType "Payment Gateway Account". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:163)
- **FI010** Unknown DocType "Account". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:165)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:194)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:215)
- **FI010** Unknown DocType "Payment Gateway Account". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:240)
- **FI010** Unknown DocType "Account". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:242)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:271)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:290)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/mpesa_settings/test_mpesa_settings.py:298)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/paymob_settings/paymob_settings.py:231)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/paymob_settings/paymob_settings.py:243)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/paypal_settings/paypal_settings.py:114)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/paypal_settings/paypal_settings.py:242)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/paypal_settings/paypal_settings.py:289)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/paypal_settings/paypal_settings.py:422)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/paytm_settings/paytm_settings.py:147)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/razorpay_settings/razorpay_settings.py:373)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/razorpay_settings/razorpay_settings.py:521)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/razorpay_settings/razorpay_settings.py:548)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/razorpay_settings/razorpay_settings.py:551)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/razorpay_settings/razorpay_settings.py:587)
- **FI010** Unknown DocType "Integration Request". (payments/payment_gateways/doctype/razorpay_settings/razorpay_settings.py:614)
- **FI010** Unknown DocType "Payment Request". (payments/payment_gateways/stripe_integration.py:20)
- **FI010** Unknown DocType "Subscription Plan". (payments/payment_gateways/stripe_integration.py:40)
- **FI010** Unknown DocType "Customer". (payments/templates/pages/gocardless_checkout.py:58)
- **FI010** Unknown DocType "Contact". (payments/templates/pages/gocardless_checkout.py:61)
- **FI010** Unknown DocType "Integration Request". (payments/templates/pages/payment_cancel.py:11)
- **FI010** Unknown DocType "Integration Request". (payments/templates/pages/paytm_checkout.py:22)
- **FI010** Unknown DocType "Integration Request". (payments/templates/pages/razorpay_checkout.py:33)
- **FI010** Unknown DocType "Payment Plan". (payments/templates/pages/stripe_checkout.py:47)
- **FI010** Unknown DocType "Integration Request". (payments/utils/utils.py:10)
- **FI010** Unknown DocType "{} Settings". (payments/utils/utils.py:33)

## Warnings

- **FI030** Hook before_install target "payments.utils.before_install" could not be resolved in local apps. (payments/hooks.py:66)
- **FI030** Hook after_install target "payments.utils.make_custom_fields" could not be resolved in local apps. (payments/hooks.py:67)
- **FI030** Hook before_uninstall target "payments.utils.delete_custom_fields" could not be resolved in local apps. (payments/hooks.py:72)
- **FI030** Hook extend_doctype_class target "payments.overrides.payment_webform.PaymentWebForm" could not be resolved in local apps. (payments/hooks.py:97)
- **FI002** Payment Gateway.gateway_settings: Payment Gateway.gateway_settings points to unknown DocType "DocType". (payments/payments/doctype/payment_gateway/payment_gateway.json:23)
