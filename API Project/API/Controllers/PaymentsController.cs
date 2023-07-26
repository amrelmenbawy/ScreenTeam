using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistance.Services;
using Stripe;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : BaseApiController
    {
        IPaymentService paymentService;
        private const string WhSecret = "whsec_0faabbf2c1fe307cf7a8ccb49b5173293d1529a79d40991665127f61dafd44f2";
        private ILogger<PaymentsController> logger;
        public PaymentsController(IPaymentService paymentService , ILogger<PaymentsController> logger)
        {
            this.paymentService = paymentService;
            this.logger = logger;
        }
        [Authorize]
        [HttpPost("{basketId}")]
       // public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId ,[FromQuery] int orderid)
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            //return await paymentService.CreateOrUpdatePaymentIntent(basketId, orderid);
            return await paymentService.CreateOrUpdatePaymentIntent(basketId);

        }


        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], WhSecret);

            PaymentIntent intent;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    logger.LogInformation("Payment succeded", intent.Id);
                    order = await paymentService.UpdateOrderPaymentSucceded(intent.Id);
                    logger.LogInformation("Order Updated to payment recived", order.ID);
                    break;
                    
                case "payment_intent.payment_failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    logger.LogInformation("Payment failed", intent.Id);
                    order = await paymentService.UpdateOrderPaymentFailed(intent.Id);
                    logger.LogInformation("Order Updated to payment failed", order.ID);
                    break;

            }

            return new EmptyResult();



        }
    }
}
