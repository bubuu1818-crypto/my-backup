#!/bin/bash
# Card news carousel 빌드 스크립트

set -e

echo "🔨 Building card news engine..."
npm run build

echo "🎨 Validating design tokens..."
npm run validate:tokens

echo "📦 Generating sample output..."
npm run generate:samples

echo "✅ Build complete!"
