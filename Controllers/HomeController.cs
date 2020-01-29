using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SitelistManager.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Enterprise Mode is a compatibility mode that runs on Internet Explorer 11, letting websites render using a modified browser configuration that’s designed to emulate either Windows Internet Explorer 8 or Windows Internet Explorer 7, avoiding the common compatibility problems associated with web apps written and tested on older versions of Internet Explorer. You can use IE11 and the Enterprise Mode Site List Manager to add individual website domains and domain paths and to specify whether the site renders using Enterprise Mode or the default mode.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}