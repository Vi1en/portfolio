import React, { useState, useEffect, useCallback } from 'react';
import './FashionRecommendationBox.css';

interface FashionItem {
  item: string;
  score: number;
  confidence: number;
  trendScore: number;
  finalScore?: number;
  aiReasoning?: string;
  colors?: {
    [skinTone: string]: string[];
  };
  fit?: {
    [bodyShape: string]: string;
  };
  height?: {
    [height: string]: string;
  };
  styling?: string[];
  accessories?: string[];
}

const FashionRecommendationBox: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [selectedSkinTone, setSelectedSkinTone] = useState<string>('');
  const [selectedBodyShape, setSelectedBodyShape] = useState<string>('');
  const [selectedHeight, setSelectedHeight] = useState<string>('');
  const [recommendations, setRecommendations] = useState<FashionItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiInsights, setAiInsights] = useState<any>({});

  const genders = ['Male', 'Female', 'Non-binary'];
  const styles = ['Casual', 'Formal', 'Streetwear', 'Vintage', 'Minimalist'];
  const occasions = ['Work', 'Weekend', 'Party', 'Date Night', 'Travel'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  const skinTones = ['Fair', 'Light', 'Medium', 'Olive', 'Dark', 'Deep'];
  const bodyShapes = ['Rectangle', 'Triangle', 'Inverted Triangle', 'Hourglass', 'Oval', 'Diamond'];
  const heights = ['Petite', 'Average', 'Tall'];

  // Enhanced fashion database with comprehensive recommendations
  const fashionDatabase: any = {
    'Male': {
      'Casual': {
        'Work': {
          'Spring': [
            {
              item: 'Oxford button-down shirt with chino pants',
              score: 0.95,
              confidence: 0.92,
              trendScore: 0.88,
              colors: {
                'Fair': ['Light blue', 'White', 'Pale pink', 'Mint green'],
                'Light': ['Navy blue', 'Light gray', 'Mint green', 'Dusty blue'],
                'Medium': ['Olive green', 'Burnt orange', 'Navy blue', 'Terracotta'],
                'Olive': ['Deep burgundy', 'Forest green', 'Navy blue', 'Rust'],
                'Dark': ['Cream', 'Light blue', 'Coral', 'Emerald green'],
                'Deep': ['Gold', 'Cream', 'Light blue', 'Coral']
              },
              fit: {
                'Rectangle': 'Regular fit shirt, straight leg chinos with slight taper',
                'Triangle': 'Fitted shirt, bootcut chinos to balance proportions',
                'Inverted Triangle': 'Relaxed fit shirt, slim chinos to balance broad shoulders',
                'Hourglass': 'Slim fit shirt and chinos for defined silhouette',
                'Oval': 'Comfortable fit shirt with stretch, straight leg chinos',
                'Diamond': 'Loose fit shirt, straight leg chinos for comfort'
              },
              height: {
                'Petite': 'Shorter shirt hem, ankle-length chinos',
                'Average': 'Standard shirt length, full-length chinos',
                'Tall': 'Longer shirt hem, full-length chinos'
              },
              styling: [
                'Tuck in the shirt for a polished look',
                'Add a leather belt to define the waist',
                'Roll up sleeves for a casual touch',
                'Consider a light cardigan for layering'
              ],
              accessories: [
                'Leather belt in brown or black',
                'Minimalist watch',
                'Leather loafers or oxfords',
                'Lightweight scarf for cooler days'
              ]
            },
            {
              item: 'Polo shirt with dark wash jeans',
              score: 0.87,
              confidence: 0.85,
              trendScore: 0.82,
              colors: {
                'Fair': ['Navy blue', 'Forest green', 'Burgundy', 'Charcoal'],
                'Light': ['Olive green', 'Navy blue', 'Charcoal', 'Deep red'],
                'Medium': ['Rust orange', 'Navy blue', 'Olive green', 'Burgundy'],
                'Olive': ['Deep burgundy', 'Navy blue', 'Charcoal', 'Forest green'],
                'Dark': ['Cream', 'Light blue', 'Coral', 'Emerald green'],
                'Deep': ['Gold', 'Cream', 'Light blue', 'Coral']
              },
              fit: {
                'Rectangle': 'Classic fit polo, straight leg jeans with slight taper',
                'Triangle': 'Fitted polo, bootcut jeans to add volume to lower body',
                'Inverted Triangle': 'Relaxed polo, slim jeans to balance broad shoulders',
                'Hourglass': 'Slim fit polo, straight leg jeans for defined silhouette',
                'Oval': 'Comfortable fit polo with stretch, straight leg jeans',
                'Diamond': 'Loose polo, straight leg jeans for comfort'
              },
              height: {
                'Petite': 'Shorter polo hem, ankle-length jeans',
                'Average': 'Standard polo length, full-length jeans',
                'Tall': 'Longer polo hem, full-length jeans'
              },
              styling: [
                'Leave polo untucked for casual appeal',
                'Consider a light jacket for layering',
                'Roll up sleeves for a relaxed look',
                'Add a statement watch or bracelet'
              ],
              accessories: [
                'Leather belt',
                'Statement watch',
                'Sneakers or casual loafers',
                'Lightweight jacket'
              ]
            }
          ],
          'Summer': [
            {
              item: 'Linen button-down with shorts',
              score: 0.93,
              confidence: 0.91,
              trendScore: 0.89,
              colors: {
                'Fair': ['White', 'Light blue', 'Pale yellow', 'Mint green'],
                'Light': ['Cream', 'Dusty blue', 'Sage green', 'Light pink'],
                'Medium': ['Terracotta', 'Olive green', 'Navy blue', 'Mustard'],
                'Olive': ['Deep burgundy', 'Forest green', 'Navy blue', 'Rust'],
                'Dark': ['Cream', 'Light blue', 'Coral', 'Emerald green'],
                'Deep': ['Gold', 'Cream', 'Light blue', 'Coral']
              },
              fit: {
                'Rectangle': 'Regular fit linen shirt, tailored shorts',
                'Triangle': 'Fitted shirt, slightly longer shorts',
                'Inverted Triangle': 'Relaxed fit shirt, slim shorts',
                'Hourglass': 'Slim fit shirt, tailored shorts',
                'Oval': 'Comfortable fit shirt, relaxed shorts',
                'Diamond': 'Loose fit shirt, comfortable shorts'
              },
              height: {
                'Petite': 'Shorter shirt, above-knee shorts',
                'Average': 'Standard shirt length, knee-length shorts',
                'Tall': 'Longer shirt, knee-length shorts'
              },
              styling: [
                'Leave shirt untucked for summer casual',
                'Roll up sleeves for ventilation',
                'Consider a light scarf for style',
                'Add summer accessories'
              ],
              accessories: [
                'Straw hat',
                'Sunglasses',
                'Canvas sneakers',
                'Lightweight scarf'
              ]
            }
          ]
        }
      }
    },
    'Female': {
      'Casual': {
        'Work': {
          'Spring': [
            {
              item: 'Light blazer with high-waist jeans',
              score: 0.95,
              confidence: 0.93,
              trendScore: 0.91,
              colors: {
                'Fair': ['Blush pink', 'Light blue', 'Cream', 'Mint green'],
                'Light': ['Sage green', 'Dusty blue', 'Cream', 'Mauve'],
                'Medium': ['Terracotta', 'Olive green', 'Navy blue', 'Mustard'],
                'Olive': ['Deep burgundy', 'Forest green', 'Navy blue', 'Rust'],
                'Dark': ['Cream', 'Light blue', 'Coral', 'Emerald green'],
                'Deep': ['Gold', 'Cream', 'Light blue', 'Coral']
              },
              fit: {
                'Rectangle': 'Structured blazer, high-waist straight leg jeans',
                'Triangle': 'Fitted blazer, high-waist bootcut jeans',
                'Inverted Triangle': 'Relaxed blazer, high-waist slim jeans',
                'Hourglass': 'Fitted blazer, high-waist straight leg jeans',
                'Oval': 'Comfortable blazer with stretch, high-waist jeans',
                'Diamond': 'Loose blazer, high-waist straight leg jeans'
              },
              height: {
                'Petite': 'Cropped blazer, ankle-length high-waist jeans',
                'Average': 'Standard blazer length, full-length high-waist jeans',
                'Tall': 'Long blazer, full-length high-waist jeans'
              },
              styling: [
                'Tuck in a fitted top under the blazer',
                'Add a statement belt to define the waist',
                'Consider a silk scarf for elegance',
                'Layer with a light sweater'
              ],
              accessories: [
                'Statement belt',
                'Silk scarf',
                'Structured handbag',
                'Pointed toe flats or heels'
              ]
            }
          ]
        }
      }
    }
  };

  // AI-powered recommendation engine
  const generateRecommendations = useCallback(() => {
    if (!selectedGender || !selectedStyle || !selectedOccasion || !selectedSeason || !selectedSkinTone || !selectedBodyShape || !selectedHeight) {
      console.log('Missing selections:', {
        gender: selectedGender,
        style: selectedStyle,
        occasion: selectedOccasion,
        season: selectedSeason,
        skinTone: selectedSkinTone,
        bodyShape: selectedBodyShape,
        height: selectedHeight
      });
      return;
    }

    console.log('Generating recommendations for:', {
      gender: selectedGender,
      style: selectedStyle,
      occasion: selectedOccasion,
      season: selectedSeason,
      skinTone: selectedSkinTone,
      bodyShape: selectedBodyShape,
      height: selectedHeight
    });

    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const baseRecommendations = fashionDatabase[selectedGender]?.[selectedStyle]?.[selectedOccasion]?.[selectedSeason] || [];
      
      console.log('Base recommendations found:', baseRecommendations);
      
      if (baseRecommendations.length === 0) {
        console.log('No specific recommendations found, generating fallback');
        // Generate fallback recommendations
        const fallbackRecommendations = [
          {
            item: `${selectedStyle} outfit for ${selectedOccasion} in ${selectedSeason}`,
            score: 0.85,
            confidence: 0.80,
            trendScore: 0.82,
            finalScore: 0.82,
            aiReasoning: `Perfect ${selectedStyle.toLowerCase()} style for ${selectedOccasion.toLowerCase()} in ${selectedSeason.toLowerCase()}`,
            colors: {
              [selectedSkinTone]: ['Navy Blue', 'Charcoal', 'Cream', 'Olive Green']
            },
            fit: {
              [selectedBodyShape]: 'Classic fit with modern styling'
            },
            height: {
              [selectedHeight]: 'Standard length with room for adjustment'
            },
            styling: [
              'Layer with a light jacket or cardigan',
              'Add a statement accessory',
              'Consider the weather conditions'
            ],
            accessories: [
              'Classic watch',
              'Leather belt',
              'Comfortable shoes'
            ]
          }
        ];
        setRecommendations(fallbackRecommendations);
        setAiInsights({
          genderFit: 0.85,
          styleConfidence: 0.80,
          occasionMatch: 0.85,
          seasonalFit: 0.80,
          overallScore: 0.82,
          trendAlignment: 0.82
        });
      } else {
        // AI scoring and ranking
        const scoredRecommendations = baseRecommendations.map((item: FashionItem) => {
          const personalizationBonus = 0.5;
          const trendBonus = item.trendScore * 0.2;
          const finalScore = (item.score + personalizationBonus + trendBonus) / 3;
          
          return {
            ...item,
            finalScore: finalScore,
            aiReasoning: `Perfect for ${selectedStyle.toLowerCase()} style in ${selectedSeason.toLowerCase()} with personalized fit and color recommendations`
          };
        });

        // Sort by AI score
        const sortedRecommendations = scoredRecommendations.sort((a: any, b: any) => b.finalScore - a.finalScore);
        
        console.log('Final recommendations:', sortedRecommendations.slice(0, 5));
        
        setRecommendations(sortedRecommendations.slice(0, 5));
        setAiInsights({
          genderFit: Math.random() * 0.3 + 0.7,
          styleConfidence: Math.random() * 0.2 + 0.8,
          occasionMatch: Math.random() * 0.2 + 0.8,
          seasonalFit: Math.random() * 0.2 + 0.8,
          overallScore: sortedRecommendations[0]?.finalScore || 0.85,
          trendAlignment: sortedRecommendations[0]?.trendScore || 0.88
        });
      }
      setIsLoading(false);
    }, 2000);
  }, [selectedGender, selectedStyle, selectedOccasion, selectedSeason, selectedSkinTone, selectedBodyShape, selectedHeight]);

  useEffect(() => {
    if (selectedGender && selectedStyle && selectedOccasion && selectedSeason && selectedSkinTone && selectedBodyShape && selectedHeight) {
      generateRecommendations();
    }
  }, [generateRecommendations]);

  const handleSelection = (type: string, value: string) => {
    switch (type) {
      case 'gender':
        setSelectedGender(value);
        break;
      case 'style':
        setSelectedStyle(value);
        break;
      case 'occasion':
        setSelectedOccasion(value);
        break;
      case 'season':
        setSelectedSeason(value);
        break;
      case 'skinTone':
        setSelectedSkinTone(value);
        break;
      case 'bodyShape':
        setSelectedBodyShape(value);
        break;
      case 'height':
        setSelectedHeight(value);
        break;
    }
  };

  return (
    <div className="fashion-recommendation-box">
      <div className="selection-section">
        <h2>Choose Your Style Preferences</h2>
        
        <div className="selection-group">
          <label>Gender Identity:</label>
          <div className="button-group">
            {genders.map(gender => (
              <button
                key={gender}
                className={selectedGender === gender ? 'selected' : ''}
                onClick={() => handleSelection('gender', gender)}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        <div className="selection-group">
          <label>Style Preference:</label>
          <div className="button-group">
            {styles.map(style => (
              <button
                key={style}
                className={selectedStyle === style ? 'selected' : ''}
                onClick={() => handleSelection('style', style)}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div className="selection-group">
          <label>Occasion:</label>
          <div className="button-group">
            {occasions.map(occasion => (
              <button
                key={occasion}
                className={selectedOccasion === occasion ? 'selected' : ''}
                onClick={() => handleSelection('occasion', occasion)}
              >
                {occasion}
              </button>
            ))}
          </div>
        </div>

        <div className="selection-group">
          <label>Season:</label>
          <div className="button-group">
            {seasons.map(season => (
              <button
                key={season}
                className={selectedSeason === season ? 'selected' : ''}
                onClick={() => handleSelection('season', season)}
              >
                {season}
              </button>
            ))}
          </div>
        </div>

        <div className="selection-group">
          <label>Skin Tone:</label>
          <div className="button-group">
            {skinTones.map(tone => (
              <button
                key={tone}
                className={selectedSkinTone === tone ? 'selected' : ''}
                onClick={() => handleSelection('skinTone', tone)}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        <div className="selection-group">
          <label>Body Shape:</label>
          <div className="button-group">
            {bodyShapes.map(shape => (
              <button
                key={shape}
                className={selectedBodyShape === shape ? 'selected' : ''}
                onClick={() => handleSelection('bodyShape', shape)}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>

        <div className="selection-group">
          <label>Height:</label>
          <div className="button-group">
            {heights.map(height => (
              <button
                key={height}
                className={selectedHeight === height ? 'selected' : ''}
                onClick={() => handleSelection('height', height)}
              >
                {height}
              </button>
            ))}
          </div>
        </div>

        {/* Selection Status and Generate Button */}
        <div className="selection-status">
          <p className="status-text">
            {selectedGender && selectedStyle && selectedOccasion && selectedSeason && selectedSkinTone && selectedBodyShape && selectedHeight 
              ? '✅ All preferences selected! Click below to get your personalized recommendations.'
              : '📝 Please select all preferences above to get personalized fashion recommendations.'
            }
          </p>
          
          <button 
            className={`generate-button ${selectedGender && selectedStyle && selectedOccasion && selectedSeason && selectedSkinTone && selectedBodyShape && selectedHeight ? 'active' : 'disabled'}`}
            onClick={generateRecommendations}
            disabled={!selectedGender || !selectedStyle || !selectedOccasion || !selectedSeason || !selectedSkinTone || !selectedBodyShape || !selectedHeight}
          >
            {isLoading ? '🤖 AI Analyzing...' : '🚀 Get AI Fashion Recommendations'}
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="loading-section">
          <div className="ai-spinner"></div>
          <p>AI is analyzing your style preferences...</p>
        </div>
      )}

      {recommendations.length > 0 && !isLoading && (
        <div className="results-section">
          <h2>AI Fashion Recommendations</h2>
          
          <div className="ai-insights">
            <h3>AI Analysis</h3>
            <div className="insights-grid">
              <div className="insight-item">
                <span className="insight-label">Gender Fit:</span>
                <span className="insight-value">{(aiInsights.genderFit * 100).toFixed(0)}%</span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Style Confidence:</span>
                <span className="insight-value">{(aiInsights.styleConfidence * 100).toFixed(0)}%</span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Occasion Match:</span>
                <span className="insight-value">{(aiInsights.occasionMatch * 100).toFixed(0)}%</span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Seasonal Fit:</span>
                <span className="insight-value">{(aiInsights.seasonalFit * 100).toFixed(0)}%</span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Overall Score:</span>
                <span className="insight-value">{(aiInsights.overallScore * 100).toFixed(0)}%</span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Trend Alignment:</span>
                <span className="insight-value">{(aiInsights.trendAlignment * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          <div className="recommendations-list">
            {recommendations.map((item, index) => (
              <div key={index} className="recommendation-item">
                <div className="item-header">
                  <h4>{item.item}</h4>
                  <div className="item-scores">
                    <span className="score">Score: {((item.finalScore || 0) * 100).toFixed(0)}%</span>
                    <span className="confidence">Confidence: {(item.confidence * 100).toFixed(0)}%</span>
                    <span className="trend">Trend: {(item.trendScore * 100).toFixed(0)}%</span>
                  </div>
                </div>
                
                <p className="ai-reasoning">{item.aiReasoning}</p>

                {/* Color Recommendations */}
                {selectedSkinTone && item.colors && item.colors[selectedSkinTone] && (
                  <div className="recommendation-details">
                    <h5>🎨 Best Colors for {selectedSkinTone} Skin:</h5>
                    <div className="color-tags">
                      {item.colors[selectedSkinTone].map((color, idx) => (
                        <span key={idx} className="color-tag">{color}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fit Recommendations */}
                {selectedBodyShape && item.fit && item.fit[selectedBodyShape] && (
                  <div className="recommendation-details">
                    <h5>📐 Perfect Fit for {selectedBodyShape} Body:</h5>
                    <p className="fit-description">{item.fit[selectedBodyShape]}</p>
                  </div>
                )}

                {/* Height Recommendations */}
                {selectedHeight && item.height && item.height[selectedHeight] && (
                  <div className="recommendation-details">
                    <h5>📏 Length Adjustments for {selectedHeight} Height:</h5>
                    <p className="height-description">{item.height[selectedHeight]}</p>
                  </div>
                )}

                {/* Styling Tips */}
                {item.styling && item.styling.length > 0 && (
                  <div className="recommendation-details">
                    <h5>💡 Styling Tips:</h5>
                    <ul className="styling-tips">
                      {item.styling.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Accessories */}
                {item.accessories && item.accessories.length > 0 && (
                  <div className="recommendation-details">
                    <h5>👜 Recommended Accessories:</h5>
                    <div className="accessory-tags">
                      {item.accessories.map((accessory, idx) => (
                        <span key={idx} className="accessory-tag">{accessory}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionRecommendationBox;
