"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import Link from "next/link";
import {
  ArrowRight,
  Code,
  Smartphone,
  Cloud,
  Brain,
  Star,
  Users,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  Database,
  Shield,
  Zap,
  Monitor,
  Palette,
  Search,
  ShoppingCart,
  Settings,
  Facebook,
  Instagram,
  Linkedin,
  Bot,
  Workflow,
  Info,
  ChevronDown,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"
import { FaTiktok } from "react-icons/fa6"

// Animated counter component
function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count}</span>
}

function FloatingParticles() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  if (dimensions.width === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Moving light particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-primary/40 rounded-full shadow-lg"
          style={{
            boxShadow: `0 0 6px ${i % 2 === 0 ? "#420570" : "#8b5cf6"}`,
          }}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            opacity: 0,
          }}
          animate={{
            x: [Math.random() * dimensions.width, Math.random() * dimensions.width, Math.random() * dimensions.width],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
            opacity: [0, 1, 0.5, 1, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Twinkling stars */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.3, 1, 0],
            scale: [0, 1, 0.5, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        >
          <div
            className="w-0.5 h-0.5 bg-primary/60 rounded-full"
            style={{
              boxShadow: `0 0 4px #420570, 0 0 8px #420570`,
            }}
          />
        </motion.div>
      ))}

      {/* Larger glowing orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `radial-gradient(circle, #420570 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function TechTashWebsite() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // '', 'sending', 'success', 'error'
  const [showPremiumDetails, setShowPremiumDetails] = useState(false);
  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result?.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        console.log(result);
      } else {
        setStatus("error");
        console.error("Web3Forms error:", result);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const services = [
    {
      icon: Award,
      title: "Digital Branding",
      description: "Full-suite digital branding package tailored for your business.",
      image: "/services/digital-branding.jpg",
      features: [
        "Domain purchase & setup",
        "Web hosting",
        "Business website",
        "Logo design",
        "Business card design",
        "Letterhead design",
        "Social media management",
        "Google Business registration",
        "Google Map setup",
        "Meta Suite registration",
        "SSL certificate setup",
        "Business email setup",
        "SEO optimization",
      ],
      isPremium: true,
    },
    {
      icon: Bot,
      title: "AI Agents",
      description: "Custom AI agents to automate tasks, improve customer service, and drive business efficiency.",
      image: "/services/ai-agent.jpg",
    },
    {
      icon: Workflow,
      title: "AI Automation",
      description: "Integration with n8n, Make, Zapier, and more to automate your business workflows.",
      image: "/services/automation.png",
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with cutting-edge technologies and premium user experiences.",
      image: "/services/web.jpeg",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile solutions that deliver exceptional performance and design.",
      image: "/services/app.jpeg",
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Scalable cloud solutions and DevOps practices for enterprise-grade applications.",
      image: "/services/cloud.png",
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Intelligent automation and machine learning integration to transform your business processes.",
      image: "/services/images.jpeg",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Complete online stores with payment gateways, inventory management, and customer analytics.",
      image: "/services/ecommerce-solutions.jpg",
    },
    {
      icon: Settings,
      title: "ERP Solutions",
      description: "End-to-end ERP implementation, customization, and integration for streamlined operations.",
      image: "/services/erp.jpg",
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Robust database design, optimization, and management for high-performance applications.",
      image: "/services/database.jpg",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security audits, penetration testing, and secure application development.",
      image: "/services/cyber.png",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "User-centered design solutions that create engaging and intuitive digital experiences.",
      image: "/services/uiux.jpg",
    },
    {
      icon: Search,
      title: "SEO & Digital Marketing",
      description: "Search engine optimization and digital marketing strategies to boost your online presence.",
      image: "/services/seo.jpg",
    },
    {
      icon: Monitor,
      title: "System Integration",
      description: "Seamless integration of existing systems with modern technologies and APIs.",
      image: "/services/systemintegration.png",
    },
    {
      icon: Settings,
      title: "Software Maintenance",
      description: "Ongoing support, updates, and maintenance to keep your applications running smoothly.",
      image: "/services/software miantenance.jpeg",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed optimization and performance tuning for maximum efficiency and user satisfaction.",
      image: "/services/perfomanceoptimization.png",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, InnovateCorp",
      content:
        "TechTash transformed our digital presence completely. Their attention to detail and premium quality is unmatched.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CTO, FutureScale",
      content:
        "Working with TechTash was a game-changer. They delivered beyond our expectations with exceptional professionalism.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, StartupX",
      content:
        "The team at TechTash doesn't just build software, they craft digital experiences that truly resonate with users.",
      rating: 5,
    },
  ]

  const projectLogos: Record<string, string> = {
    "QSB Enterprise": "/logo/qsb.jpg",
    "Hafiz UAE": "/logo/hafiz-ae.jpg",
    "ZJ Collections": "/logo/zj.jpg",
    "Cryptcio": "/logo/crypto.png",
    "Ruken Pakistan": "/logo/ruken.jpg",
    "Barlite Pakistan": "/logo/barlite.png",
    "Bison Towing": "/logo/bison-towing.jpg",
    "Benvenuto Pizza": "/logo/benvenuto.jpg",
    "Plan4Better": "/logo/plan4better.jpg",
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          <Image
            src="/techtash.png"
            alt="TechTash Logo"
            width={80}
            height={80}
            className="rounded-xl"
          />
          <div className="text-4xl font-bold text-primary">TechTash</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingParticles />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 glass-card border-b border-muted/50"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/techtash.png"
              alt="TechTash Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-primary">TechTash</span>
            </Link>
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                className="text-foreground/80 hover:text-primary transition-colors"
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button className="glow-purple" onClick={() => scrollToSection("contact")}>
              Get Started
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 text-balance"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">TechTash</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto text-pretty"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transforming your visions into Digital Realities
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="glow-purple-strong animate-pulse-glow"
                onClick={() => scrollToSection("contact")}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass bg-transparent"
                onClick={() => scrollToSection("services")}
              >
                Our Services
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Crafting Digital Excellence Since <span className="text-primary">2020</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                We are a premium software house dedicated to transforming innovative ideas into exceptional digital
                experiences. Our team combines cutting-edge technology with luxury design principles to deliver
                solutions that exceed expectations.
              </p>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: "Years Experience", value: 4 },
                  { label: "Projects Delivered", value: 150 },
                  { label: "Happy Clients", value: 98 },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">
                      <AnimatedCounter end={stat.value} />
                      {stat.label === "Happy Clients" ? "%" : "+"}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card p-8 rounded-2xl animate-float">
                <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                  <Code className="h-24 w-24 text-primary" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Our Premium <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              We offer comprehensive digital solutions tailored to elevate your business to new heights of success and
              innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <Card className="bg-card border border-black-700 p-6 h-full group-hover:glow-purple transition-all duration-300 relative">
                  {service.isPremium && (
                    <Badge variant="destructive" className="absolute top-4 right-4 z-20">Premium</Badge>
                  )}
                  {service.image && (
                    <div className="relative w-full h-32 mb-4 overflow-hidden rounded-md z-0">
                      <Image src={service.image} alt={`${service.title} image`} layout="fill" objectFit="cover" />
                    </div>
                  )}
                  <div className="mb-4">
                    <service.icon className="h-12 w-12 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>

                  {service.isPremium && (
                    <>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="glass bg-transparent"
                          onClick={() => setShowPremiumDetails(true)}
                        >
                          See details
                        
                        </Button>
                        <Button size="sm" className="glow-purple" onClick={() => scrollToSection("contact")}>
                          Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      {/* Details now open in a modal */}
                    </>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Details Modal */}
      {showPremiumDetails && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowPremiumDetails(false)}
          />
          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-[61] max-w-xl w-[90%]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Premium Package Details"
          >
            <Card className="bg-card border border-black-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold">Digital Branding</h3>
                  <p className="text-sm text-muted-foreground">What’s included in the premium package</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowPremiumDetails(false)} aria-label="Close">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="rounded-lg border border-muted/40 p-4 bg-background/40">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">What’s included</span>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  {(services.find((s: any) => s.isPremium)?.features || []).map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowPremiumDetails(false)}>Close</Button>
                <Button className="glow-purple" onClick={() => { setShowPremiumDetails(false); scrollToSection('contact'); }}>
                  Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Featured <span className="text-primary dark:text-white">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover our latest work and see how we've helped businesses transform their digital presence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "QSB Enterprise",
                url: "https://qsbenterprise.com",
                description: "Corporate business solutions platform with modern design and functionality.",
                tags: ["Next.js", "Business", "Corporate"]
              },
              {
                name: "Hafiz UAE",
                url: "https://hafiz.ae",
                description: "Professional services website with elegant design and user experience.",
                tags: ["React", "Services", "UAE"]
              },
              {
                name: "ZJ Collections",
                url: "https://zjcollections.com",
                description: "E-commerce platform for premium collections with modern shopping experience.",
                tags: ["E-commerce", "Collections", "Shopping"]
              },
              {
                name: "Cryptcio",
                url: "https://cryptcio.arrowtheme.com/home-default/",
                description: "Cryptocurrency trading platform with advanced features and secure transactions.",
                tags: ["Crypto", "Trading", "Fintech"]
              },
              {
                name: "Ruken Pakistan",
                url: "https://ruken.pk",
                description: "Local business platform serving Pakistani market with tailored solutions.",
                tags: ["Business", "Pakistan", "Local"]
              },
              {
                name: "Barlite Pakistan",
                url: "https://barlite.pk",
                description: "Industrial solutions website with comprehensive product showcase.",
                tags: ["Industrial", "Products", "B2B"]
              },
              {
                name: "Bison Towing",
                url: "https://bisontowing.ca",
                description: "Professional towing services in Canada with 24/7 availability.",
                tags: ["Services", "Canada", "Automotive"]
              },
              {
                name: "Benvenuto Pizza",
                url: "https://benvenutopizza.ca",
                description: "Italian restaurant website with online ordering and authentic dining experience.",
                tags: ["Restaurant", "Food", "Online Ordering"]
              },
              {
                name: "Plan4Better",
                url: "https://www.plan4better.ca",
                description: "Planning and consultation services with comprehensive business solutions.",
                tags: ["Consulting", "Planning", "Business"]
              }
            ].map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Card className="bg-card border border-black-700 p-6 h-full group-hover:glow-purple transition-all duration-300">
                  <div className="p-6 flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <Image src={projectLogos[project.name] || "/techtash.png"} alt={`${project.name} logo`} width={40} height={40} className="rounded-sm opacity-80 object-contain" />
                      <h3 className="text-xl font-semibold text-primary dark:text-white transition-colors">{project.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex justify-end">
                    <Button
                      variant="outline"
                      className="glass bg-transparent"
                      onClick={() => window.open(project.url, '_blank')}
                    >
                      Live Demo
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Our Global <span className="text-primary dark:text-white">Offices</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Serving clients worldwide with local presence and global expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                country: "Canada",
                address: "871 Bairdmore Blvd\nR3T 5H6\nWinnipeg, Manitoba CA",
                flag: "/canada.png"
              },
              {
                country: "United Arab Emirates",
                address: "1. China Cluster, International City\n   Dubai UAE\n2. Ras Al Khor Ind. 2\n   Dubai UAE",
                flag: "/UAE.png"
              },
              {
                country: "Pakistan",
                address: "2nd Floor, Legis Accord Plaza\nMain Canal Road, Jallo\nLahore",
                flag: "/pak.png"
              }
            ].map((office, index) => (
              <motion.div
                key={office.country}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-card border border-black-700 p-6 h-full group-hover:glow-purple transition-all duration-300 overflow-hidden rounded-2xl">
                  <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 bg-primary/10 blur-3xl rounded-full" />

                  <div className="flex flex-col items-center mb-4">
                    <div className="relative w-12 h-12 rounded-full ring-1 ring-white/10 overflow-hidden shadow-md mb-2">
                      <Image src={office.flag} alt={`${office.country} flag`} layout="fill" objectFit="cover" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary dark:text-white">{office.country}</h3>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-background/40 p-2">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{office.address}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Why Choose <span className="text-primary dark:text-white">TechTash</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Premium Quality", desc: "Exceptional standards in every project" },
              { icon: Users, title: "Expert Team", desc: "Skilled professionals with proven expertise" },
              { icon: Globe, title: "Global Reach", desc: "Serving clients worldwide with excellence" },
              { icon: Star, title: "5-Star Service", desc: "Consistently rated highest by our clients" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="glass-card p-6 rounded-2xl mb-4 inline-block">
                  <item.icon className="h-12 w-12 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Client <span className="text-primary dark:text-white">Testimonials</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-card p-6 h-full border-muted/50 bg-transparent">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 text-pretty">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Let's Create Something <span className="text-primary dark:text-white">Amazing</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Ready to transform your vision into digital reality? Get in touch with our team today.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card p-8 border-muted/50 bg-transparent">
                <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 glass rounded-lg border border-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 glass rounded-lg border border-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 glass rounded-lg border border-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full glow-purple" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  {status === 'success' && <p className="text-green-500 mt-4">Message sent successfully!</p>}
                  {status === 'error' && <p className="text-red-500 mt-4">Failed to send message. Please try again.</p>}
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-6">Get in touch</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      items: [
                        { text: "info@techtash.ca", href: "mailto:contact@techtash.ca" },
                      ],
                    },
                    {
                      icon: Phone,
                      label: "Canada",
                      items: [
                        { text: "+1 204 952 0477", href: "tel:+12049520477" },
                        { text: "+1 431 458 0477", href: "tel:+14314580477" },
                      ],
                    },
                    {
                      icon: Phone,
                      label: "UAE",
                      items: [
                        { text: "+971 52 342 1122", href: "tel:+971523421122" },
                      ],
                    },
                    {
                      icon: Phone,
                      label: "Pakistan",
                      items: [
                        { text: "+92 304 493 6723", href: "tel:+923044936723" },
                      ],
                    },
                  ].map((contact, index) => (
                    <motion.div
                      key={contact.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-4"
                    >
                      <div className="glass-card p-3 rounded-lg">
                        <contact.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{contact.label}</div>
                        <div className="text-muted-foreground flex flex-col">
                          {contact.items.map((item) => (
                            <a
                              key={item.href}
                              href={item.href}
                              className="group inline-flex items-center gap-1 hover:text-primary transition-colors"
                            >
                              <span>{item.text}</span>
                              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h4 className="text-lg font-semibold mb-4">Why work with us?</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    Premium quality guaranteed
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    24/7 dedicated support
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    Cutting-edge technology
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    On-time delivery promise
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-background" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/techtash.png"
                  alt="TechTash Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <div className="text-2xl font-bold text-primary">TechTash</div>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Transforming visions into digital realities with premium quality and innovation.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection("services")} className="hover:text-primary transition-colors">Web Development</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-primary transition-colors">Mobile Apps</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-primary transition-colors">Cloud Solutions</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-primary transition-colors">AI Integration</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection("portfolio")} className="hover:text-primary transition-colors">Portfolio</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors">Careers</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <motion.a href="https://www.facebook.com/profile.php?id=61580098733066" target="_blank" whileHover={{ scale: 1.2 }} className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:glow-purple transition-all duration-300">
                  <Facebook className="h-6 w-6" />
                </motion.a>
                <motion.a href="https://www.instagram.com/techtash.ca?igsh=MTcxa3E5Z3c0eXpjZA==&utm_source=ig_contact_invite" target="_blank" whileHover={{ scale: 1.2 }} className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:glow-purple transition-all duration-300">
                  <Instagram className="h-6 w-6" />
                </motion.a>
                <motion.a href="https://www.tiktok.com/@techtash.ca" target="_blank" whileHover={{ scale: 1.2 }} className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:glow-purple transition-all duration-300">
                  <FaTiktok className="h-6 w-6" />
                </motion.a>
                <motion.a href="https://www.linkedin.com/company/techtash/" target="_blank" whileHover={{ scale: 1.2 }} className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:glow-purple transition-all duration-300">
                  <Linkedin className="h-6 w-6" />
                </motion.a>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} TechTash. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
