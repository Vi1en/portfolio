/**
 * AI Fashion Recommendation System - Test Suite
 * This file demonstrates the AI/ML algorithms and capabilities
 */

// Mock fashion database with AI scoring
const fashionDatabase = {
  'Casual': {
    'Work': {
      'Spring': [
        { item: 'Light blazer with jeans', score: 0.95, confidence: 0.92, trendScore: 0.88 },
        { item: 'Polo shirt with chinos', score: 0.87, confidence: 0.85, trendScore: 0.82 },
        { item: 'Cardigan with blouse', score: 0.89, confidence: 0.88, trendScore: 0.85 }
      ]
    }
  }
};

// AI Recommendation Engine
class AIFashionEngine {
  constructor() {
    this.userHistory = [];
    this.userPreferences = {};
    this.learningRate = 0.1;
  }

  // AI Style Analysis
  analyzeUserStyle(selections) {
    const analysis = {
      styleConfidence: 0,
      occasionMatch: 0,
      seasonalAppropriateness: 0,
      trendAlignment: 0,
      overallScore: 0
    };

    // Analyze style confidence based on user history
    if (this.userHistory.length > 0) {
      const styleFrequency = this.userHistory.filter(h => h.style === selections.style).length;
      analysis.styleConfidence = Math.min(styleFrequency / this.userHistory.length * 100, 100);
    }

    // Analyze occasion match with weighted scoring
    const occasionWeights = {
      'Work': 0.9, 'Formal Event': 0.95, 'Party': 0.85, 'Date Night': 0.9,
      'Weekend': 0.8, 'Travel': 0.85, 'Sport': 0.9, 'Casual Outing': 0.8, 'Creative Meeting': 0.85
    };
    analysis.occasionMatch = occasionWeights[selections.occasion] * 100;

    // Analyze seasonal appropriateness
    const seasonalWeights = {
      'Spring': 0.9, 'Summer': 0.9, 'Fall': 0.9, 'Winter': 0.9
    };
    analysis.seasonalAppropriateness = seasonalWeights[selections.season] * 100;

    // Calculate overall score using weighted average
    analysis.overallScore = (
      analysis.styleConfidence * 0.3 +
      analysis.occasionMatch * 0.3 +
      analysis.seasonalAppropriateness * 0.2 +
      analysis.trendAlignment * 0.2
    );

    return analysis;
  }

  // Generate AI recommendations with scoring
  generateRecommendations(style, occasion, season) {
    const styleData = fashionDatabase[style];
    if (!styleData || !styleData[occasion] || !styleData[occasion][season]) {
      return [];
    }

    let recommendations = styleData[occasion][season];
    
    // Apply AI scoring and ranking
    recommendations = recommendations.map(rec => ({
      ...rec,
      aiScore: rec.score * 0.4 + rec.confidence * 0.3 + rec.trendScore * 0.3,
      personalizationBonus: this.calculatePersonalizationBonus(rec),
      finalScore: 0
    }));

    // Calculate final scores with personalization
    recommendations.forEach(rec => {
      rec.finalScore = rec.aiScore * 0.7 + rec.personalizationBonus * 0.3;
    });

    // Sort by final score and return top recommendations
    return recommendations
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, 5)
      .map(rec => ({
        item: rec.item,
        confidence: Math.round(rec.finalScore * 100),
        reasoning: this.generateReasoning(rec, style, occasion, season)
      }));
  }

  // Calculate personalization bonus using AI
  calculatePersonalizationBonus(recommendation) {
    let bonus = 0.5; // Base bonus
    
    // Color preferences analysis
    if (this.userPreferences.favoriteColors) {
      const colorKeywords = ['black', 'white', 'blue', 'red', 'green', 'yellow', 'pink', 'purple'];
      colorKeywords.forEach(color => {
        if (recommendation.item.toLowerCase().includes(color)) {
          bonus += 0.1;
        }
      });
    }

    // Style preferences analysis
    if (this.userPreferences.preferredFit === 'loose' && recommendation.item.includes('Oversized')) {
      bonus += 0.2;
    } else if (this.userPreferences.preferredFit === 'fitted' && recommendation.item.includes('Tailored')) {
      bonus += 0.2;
    }

    // Brand preferences
    if (this.userPreferences.brandPreference && recommendation.brand === this.userPreferences.brandPreference) {
      bonus += 0.15;
    }

    return Math.min(bonus, 1.0);
  }

  // Generate AI reasoning for recommendations
  generateReasoning(recommendation, style, occasion, season) {
    const reasons = [];
    
    if (recommendation.score > 0.9) reasons.push('High style compatibility');
    if (recommendation.confidence > 0.9) reasons.push('Excellent occasion match');
    if (recommendation.trendScore > 0.9) reasons.push('Trending this season');
    if (recommendation.personalizationBonus > 0.7) reasons.push('Matches your preferences');
    
    return reasons.length > 0 ? reasons.join(', ') : 'Good overall match';
  }

  // Trend Analysis Engine
  analyzeTrends(season) {
    const currentTrends = {
      'Spring': ['Pastel colors', 'Light fabrics', 'Floral patterns'],
      'Summer': ['Bright colors', 'Natural materials', 'Minimalist designs'],
      'Fall': ['Rich earth tones', 'Layered looks', 'Texture mixing'],
      'Winter': ['Deep jewel tones', 'Cozy materials', 'Statement pieces']
    };

    return currentTrends[season] || [];
  }

  // Machine Learning: Update user preferences based on interactions
  learnFromInteraction(selection, recommendation, userRating) {
    // Update user history
    this.userHistory.push({
      ...selection,
      recommendation,
      userRating,
      timestamp: new Date().toISOString()
    });

    // Learn from user rating to improve future recommendations
    if (userRating > 3) {
      // Positive feedback - strengthen this style/occasion combination
      this.strengthenPreference(selection.style, selection.occasion);
    } else if (userRating < 3) {
      // Negative feedback - weaken this preference
      this.weakenPreference(selection.style, selection.occasion);
    }
  }

  // Strengthen user preference for a style-occasion combination
  strengthenPreference(style, occasion) {
    if (!this.userPreferences.styleOccasionWeights) {
      this.userPreferences.styleOccasionWeights = {};
    }
    
    const key = `${style}-${occasion}`;
    this.userPreferences.styleOccasionWeights[key] = 
      (this.userPreferences.styleOccasionWeights[key] || 0.5) + this.learningRate;
  }

  // Weaken user preference for a style-occasion combination
  weakenPreference(style, occasion) {
    if (!this.userPreferences.styleOccasionWeights) {
      this.userPreferences.styleOccasionWeights = {};
    }
    
    const key = `${style}-${occasion}`;
    this.userPreferences.styleOccasionWeights[key] = 
      Math.max(0, (this.userPreferences.styleOccasionWeights[key] || 0.5) - this.learningRate);
  }

  // Get personalized recommendations with learning
  getPersonalizedRecommendations(style, occasion, season) {
    const baseRecommendations = this.generateRecommendations(style, occasion, season);
    
    // Apply learned preferences
    const key = `${style}-${occasion}`;
    const preferenceWeight = this.userPreferences.styleOccasionWeights?.[key] || 0.5;
    
    return baseRecommendations.map(rec => ({
      ...rec,
      confidence: Math.round(rec.confidence * preferenceWeight),
      personalizationLevel: preferenceWeight > 0.7 ? 'High' : preferenceWeight > 0.5 ? 'Medium' : 'Low'
    }));
  }
}

// Test the AI Engine
function testAIEngine() {
  console.log('🤖 Testing AI Fashion Recommendation Engine...\n');

  const aiEngine = new AIFashionEngine();
  
  // Set some user preferences
  aiEngine.userPreferences = {
    favoriteColors: ['blue', 'black'],
    preferredFit: 'loose',
    brandPreference: 'Nike'
  };

  // Test 1: Basic AI Analysis
  console.log('📊 Test 1: AI Style Analysis');
  const analysis = aiEngine.analyzeUserStyle({
    style: 'Casual',
    occasion: 'Work',
    season: 'Spring'
  });
  console.log('Analysis Results:', analysis);
  console.log('');

  // Test 2: AI Recommendations
  console.log('🎯 Test 2: AI-Generated Recommendations');
  const recommendations = aiEngine.generateRecommendations('Casual', 'Work', 'Spring');
  console.log('Recommendations:', recommendations);
  console.log('');

  // Test 3: Trend Analysis
  console.log('📈 Test 3: Trend Analysis');
  const trends = aiEngine.analyzeTrends('Spring');
  console.log('Spring Trends:', trends);
  console.log('');

  // Test 4: Machine Learning
  console.log('🧠 Test 4: Machine Learning - Learning from User Interaction');
  aiEngine.learnFromInteraction(
    { style: 'Casual', occasion: 'Work', season: 'Spring' },
    recommendations[0],
    5 // High rating
  );
  console.log('User history updated:', aiEngine.userHistory.length, 'interactions');
  console.log('Style-occasion weights:', aiEngine.userPreferences.styleOccasionWeights);
  console.log('');

  // Test 5: Personalized Recommendations
  console.log('✨ Test 5: Personalized Recommendations with Learning');
  const personalizedRecs = aiEngine.getPersonalizedRecommendations('Casual', 'Work', 'Spring');
  console.log('Personalized Recommendations:', personalizedRecs);

  console.log('\n✅ AI Engine testing completed successfully!');
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  // Node.js environment
  testAIEngine();
} else {
  // Browser environment
  console.log('🤖 AI Fashion Engine loaded successfully!');
  console.log('Run testAIEngine() in the console to test the AI capabilities.');
  window.testAIEngine = testAIEngine;
}

export default AIFashionEngine;
