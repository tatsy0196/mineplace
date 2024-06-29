let valeur =document.getElementById("input_valeur").value;
console.log(valeur);
paypal.Buttons({

    // Sets up the transaction when a payment button is clicked

    createOrder: (data, actions) => {

      return actions.order.create({

        purchase_units: [{

          amount: {

            value: valeur // Can also reference a variable or function

          }

        }]

      });

    },

    // Finalize the transaction after payer approval

    onApprove: (data, actions) => {

      return actions.order.capture().then(function(orderData) {

        // Successful capture! For dev/demo purposes:

        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

        const transaction = orderData.purchase_units[0].payments.captures[0];
        btn_cancel_onclick();
        opacity_show();
        popup_paypal_notif_show();

      });

    }

  }).render('#paypal-button-container');