import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Sun, Moon, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { PageLayout, SectionLayout } from '@/components/layout/Layout';
import { useTheme } from '@/context/ThemeContext';

export const ThemeDemo: React.FC = () => {
  const { themeConfig } = useTheme();

  return (
    <PageLayout
      title="Theme Showcase"
      description="Experience all 5 beautiful themes with interactive components"
    >
      {/* Theme Controls */}
      <SectionLayout
        title="Theme Controls"
        description="Switch between themes to see the changes in real-time"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader title="Dropdown Theme Selector" />
            <CardContent>
              <ThemeToggle variant="dropdown" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader title="Button Theme Cycler" />
            <CardContent>
              <ThemeToggle variant="button" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader title="Compact Theme Picker" />
            <CardContent>
              <ThemeToggle variant="compact" />
            </CardContent>
          </Card>
        </div>
      </SectionLayout>

      {/* Current Theme Info */}
      <SectionLayout
        title="Current Theme"
        description="Information about the currently active theme"
      >
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {themeConfig.name} Theme
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Variant:</span>
                    <span className="text-foreground">{themeConfig.variant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="text-foreground">
                      {themeConfig.isDark ? 'Dark' : 'Light'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-foreground mb-3">
                  Color Palette
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded bg-primary border border-border"></div>
                    <span className="text-xs text-muted-foreground">Primary</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded bg-secondary border border-border"></div>
                    <span className="text-xs text-muted-foreground">Secondary</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded bg-accent border border-border"></div>
                    <span className="text-xs text-muted-foreground">Accent</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded bg-muted border border-border"></div>
                    <span className="text-xs text-muted-foreground">Muted</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </SectionLayout>

      {/* Component Showcase */}
      <SectionLayout
        title="Component Showcase"
        description="See how different components look with the current theme"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Buttons */}
          <Card variant="elevated" hover>
            <CardHeader title="Enhanced Buttons" />
            <CardContent className="space-y-4">
              <Button variant="primary" fullWidth leftIcon={<Zap className="h-4 w-4" />}>
                Primary Button
              </Button>
              <Button variant="secondary" fullWidth leftIcon={<Heart className="h-4 w-4" />}>
                Secondary Button
              </Button>
              <Button variant="outline" fullWidth leftIcon={<Sun className="h-4 w-4" />}>
                Outline Button
              </Button>
              <Button variant="ghost" fullWidth leftIcon={<Moon className="h-4 w-4" />}>
                Ghost Button
              </Button>
            </CardContent>
          </Card>

          {/* Inputs */}
          <Card variant="elevated" hover>
            <CardHeader title="Enhanced Form Elements" />
            <CardContent className="space-y-4">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                variant="default"
              />
              <Input
                label="Password"
                placeholder="Enter password"
                type="password"
                variant="filled"
              />
              <Button variant="primary" fullWidth leftIcon={<Zap className="h-4 w-4" />}>
                Submit Form
              </Button>
            </CardContent>
          </Card>

          {/* Icons & States */}
          <Card variant="outlined" hover>
            <CardHeader title="Glowing Icons & States" />
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 transition-all duration-300">
                <Sun className="h-6 w-6 text-primary drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                <span className="text-foreground font-medium">Primary Glow</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-all duration-300">
                <Moon className="h-6 w-6 text-accent" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                <span className="text-accent font-medium">Accent Glow</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-destructive/10 transition-all duration-300">
                <Zap className="h-6 w-6 text-destructive" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                <span className="text-destructive font-medium">Destructive Glow</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/20 transition-all duration-300">
                <Heart className="h-6 w-6 text-secondary-foreground" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                <span className="text-secondary-foreground font-medium">Secondary Glow</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionLayout>

      {/* Enhanced Visual Effects */}
      <SectionLayout
        title="Enhanced Visual Effects"
        description="Experience the new depth and glow effects"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Floating Card */}
          <Card variant="elevated" hover className="shadow-floating hover:glow-red-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 shadow-glow-lg glow-red"
                   style={{ filter: 'drop-shadow(0 0 20px currentColor)' }}>
                <Palette className="h-8 w-8 text-white mx-auto mt-4" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Enhanced Red Floating</h3>
              <p className="text-sm text-muted-foreground">
                Deep red shadows and glowing effects
              </p>
            </CardContent>
          </Card>

          {/* Glowing Card */}
          <Card variant="outlined" hover className="border-primary hover:glow-red">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary mx-auto mb-4 shadow-neon-lg glow-red pulse-glow">
                <Zap className="h-8 w-8 text-primary-foreground mx-auto mt-4" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Red Neon Pulse</h3>
              <p className="text-sm text-muted-foreground">
                Pulsing red neon effects
              </p>
            </CardContent>
          </Card>

          {/* Gradient Card */}
          <Card hover className="bg-gradient-to-br from-card to-primary/20 border-primary hover:glow-red">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-destructive mx-auto mb-4 shadow-accent-lg glow-red float">
                <Heart className="h-8 w-8 text-white mx-auto mt-4" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Red Gradient Float</h3>
              <p className="text-sm text-muted-foreground">
                Floating red gradient effects
              </p>
            </CardContent>
          </Card>
        </div>
      </SectionLayout>

      {/* Animated Cards */}
      <SectionLayout
        title="Animated Elements"
        description="Components with enhanced hover effects and animations"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card hover clickable variant="elevated">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3 shadow-primary-sm">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Enhanced Card {index}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Hover to see the enhanced effects
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionLayout>
    </PageLayout>
  );
};

export default ThemeDemo;
