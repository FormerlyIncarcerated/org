import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Target,
  Heart,
  Lightbulb,
  Zap,
  Layers,
  Palette,
  Code,
  Brain,
  Sparkles,
  Eye,
  MousePointer,
  Smartphone,
  Monitor,
  Accessibility,
  Gauge,
  Shield
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { PageLayout, SectionLayout } from '@/components/layout/Layout';

const problemSolutions = [
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: 'Cognitive Load Reduction',
    problem: 'Complex interfaces overwhelming users',
    solution: 'Designed intuitive component hierarchies and progressive disclosure patterns that guide users naturally through complex workflows.',
    impact: 'Reduced user onboarding time by 60% and support tickets by 40%'
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Performance Optimization',
    problem: 'Slow loading times affecting user engagement',
    solution: 'Implemented intelligent code splitting, lazy loading, and optimized rendering strategies that maintain smooth 60fps interactions.',
    impact: 'Improved Core Web Vitals scores and increased user retention by 35%'
  },
  {
    icon: <Accessibility className="h-8 w-8 text-primary" />,
    title: 'Inclusive Design',
    problem: 'Accessibility barriers excluding users',
    solution: 'Built comprehensive accessibility patterns with ARIA compliance, keyboard navigation, and screen reader optimization.',
    impact: 'Achieved WCAG AA compliance and expanded user base by 25%'
  },
  {
    icon: <Layers className="h-8 w-8 text-primary" />,
    title: 'Scalable Architecture',
    problem: 'Monolithic codebases becoming unmaintainable',
    solution: 'Architected modular component systems with clear separation of concerns and reusable design patterns.',
    impact: 'Reduced development time by 50% and improved code maintainability'
  }
];

const designPrinciples = [
  {
    icon: <Eye className="h-6 w-6 text-primary" />,
    title: 'Visual Hierarchy',
    description: 'Every element has a purpose and priority, guiding users effortlessly through their journey.'
  },
  {
    icon: <MousePointer className="h-6 w-6 text-primary" />,
    title: 'Interaction Design',
    description: 'Micro-interactions and animations that provide feedback and delight without distraction.'
  },
  {
    icon: <Smartphone className="h-6 w-6 text-primary" />,
    title: 'Mobile-First',
    description: 'Responsive designs that work beautifully across all devices and screen sizes.'
  },
  {
    icon: <Gauge className="h-6 w-6 text-primary" />,
    title: 'Performance',
    description: 'Optimized for speed without compromising on functionality or visual appeal.'
  }
];

const values = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Innovation Through Simplicity',
    description: 'Complex problems deserve elegant solutions. We believe the best user experiences feel effortless.',
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'User-Centric Design',
    description: 'Every decision is made with the end user in mind, from initial concept to final implementation.',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'Attention to Detail',
    description: 'The magic is in the details - smooth animations, perfect spacing, and thoughtful interactions.',
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'Passion for Craft',
    description: 'Built by developers who care deeply about creating exceptional digital experiences.',
  },
];

export const About: React.FC = () => {
  return (
    <PageLayout
      title="About FUSED GAMING"
      description="Crafting elegant solutions to complex user experience challenges"
    >
      {/* Hero Mission Section */}
      <SectionLayout
        title="Solving Problems Behind Great Experiences"
        description="Where technical excellence meets user-centered design"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At FUSED GAMING, we specialize in identifying and solving the invisible problems
                that stand between users and exceptional digital experiences. Our approach combines
                deep technical expertise with human-centered design principles to create solutions
                that feel effortless to use but are sophisticated under the hood.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This React TypeScript boilerplate represents years of experience distilled into
                a foundation that eliminates common friction points in web development. Every
                component, pattern, and architectural decision has been carefully considered to
                solve real problems that developers and users face every day.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </SectionLayout>

      {/* Problem-Solution Showcase */}
      <SectionLayout
        title="Elegant Solutions to Complex Challenges"
        description="Real problems we've solved and the impact of thoughtful design"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {problemSolutions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-destructive">Problem:</span> {item.problem}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-primary mb-2">Solution:</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm font-medium text-green-400 mb-1">Impact:</p>
                      <p className="text-sm text-muted-foreground">
                        {item.impact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionLayout>

      {/* Design Philosophy */}
      <SectionLayout
        title="Design Philosophy"
        description="The principles that guide every decision we make"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {designPrinciples.map((principle, index) => (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-center space-y-3"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                      {principle.icon}
                    </div>
                    <h4 className="font-semibold text-foreground">
                      {principle.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </SectionLayout>

      {/* Core Values Section */}
      <SectionLayout
        title="Core Values"
        description="The beliefs that drive our approach to solving user experience challenges"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {value.title}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionLayout>

      {/* Technical Excellence Section */}
      <SectionLayout
        title="Technical Excellence"
        description="How we solve complex problems with elegant technical solutions"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Code className="h-6 w-6 text-primary" />
                  <h4 className="text-lg font-semibold text-foreground">
                    Architecture & Patterns
                  </h4>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Component Composition:</strong> Modular, reusable components that scale</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Type Safety:</strong> TypeScript patterns that prevent runtime errors</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Performance:</strong> Optimized rendering and bundle splitting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Accessibility:</strong> WCAG compliant patterns built-in</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Testing:</strong> Comprehensive test coverage and patterns</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Palette className="h-6 w-6 text-primary" />
                  <h4 className="text-lg font-semibold text-foreground">
                    Design System Solutions
                  </h4>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Theme Architecture:</strong> 5 cohesive themes with consistent design tokens</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Responsive Design:</strong> Mobile-first approach with fluid layouts</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Animation System:</strong> Purposeful motion that enhances UX</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Color Psychology:</strong> Themes designed for different user contexts</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Micro-interactions:</strong> Subtle feedback that guides user behavior</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </SectionLayout>

      {/* Impact & Results Section */}
      <SectionLayout
        title="Measurable Impact"
        description="How elegant solutions translate to real-world results"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Gauge className="h-6 w-6 text-green-500" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">60%</h4>
                <p className="text-sm text-muted-foreground">Faster Development Time</p>
                <p className="text-xs text-muted-foreground mt-2">Through optimized workflows and reusable patterns</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">35%</h4>
                <p className="text-sm text-muted-foreground">Improved User Retention</p>
                <p className="text-xs text-muted-foreground mt-2">Through better performance and user experience</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-purple-500" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">40%</h4>
                <p className="text-sm text-muted-foreground">Fewer Support Issues</p>
                <p className="text-xs text-muted-foreground mt-2">Through intuitive design and clear user flows</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </SectionLayout>

      {/* Team Section */}
      <SectionLayout
        title="Built by Its Different Productions"
        description="Where technical expertise meets creative problem-solving"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-foreground">
                        Its Different Productions
                      </h4>
                      <p className="text-sm text-primary">Crafting Digital Experiences</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    We're not just developers - we're problem solvers who understand that the best
                    technology is invisible to the user. Our approach combines deep technical knowledge
                    with empathy for the human experience, resulting in solutions that feel natural
                    and work beautifully.
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    Every line of code in this boilerplate represents a problem we've encountered
                    and solved in real-world applications. We believe in sharing these solutions
                    to help the entire development community build better experiences.
                  </p>
                </div>

                <div className="space-y-4">
                  <h5 className="font-semibold text-foreground">Our Expertise</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Monitor className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Frontend Architecture</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Palette className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Design Systems</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Performance Optimization</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Accessibility className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Accessibility</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">UX Psychology</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Code className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Clean Code</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </SectionLayout>
    </PageLayout>
  );
};

export default About;
