$base = "d:\bellavita\bellavita\frontend\src"
$files = @(
  "component\pages\shopall\Shoall.jsx",
  "component\pages\perfumes\Perfumes.jsx",
  "component\pages\newarrivals\Newarrivals.jsx",
  "component\pages\gifting\Gifting.jsx",
  "component\pages\bestsellers\BestSellers.jsx",
  "component\pages\bathbodyinfo\Bathbodyinfo.jsx",
  "component\pages\bathbody\Bathbody.jsx",
  "component\imagecarousel\ImageCarousel.jsx",
  "component\homePageProductCard\HomePageProductCard.jsx",
  "component\category\Bodywashes.jsx",
  "component\category\Luxuryperfumes.jsx",
  "component\category\Bodydeos.jsx",
  "component\category\Bodylotions.jsx"
)
foreach ($f in $files) {
  $path = Join-Path $base $f
  if (Test-Path $path) {
    $content = [System.IO.File]::ReadAllText($path)
    $newContent = $content -replace '(?m)^(\s*)setIsCartOpen\(true\);', '$1// setIsCartOpen(true);'
    [System.IO.File]::WriteAllText($path, $newContent)
    Write-Host "Patched: $f"
  } else {
    Write-Host "Not found: $f"
  }
}
Write-Host "Done."
