﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SitelistManager.Controllers
{
    public class SiteController : Controller
    {
        // GET: Site
        public ActionResult Index()
        {
            return View();
        }

        // GET: Site/XMLPreview
        public ActionResult XMLPreview()
        {
            return View();
        }
    }
}