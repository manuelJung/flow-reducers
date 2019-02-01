# Structure

## Pages

  `theme/wucu/pages`

Pages sind für das Setup einer Route verantwortlich. Dazu gehört Identifiers und Filters zu erstellen und Props aus der Url zu bilden. Außerdem werden hier sämtlich meta-tags in den Header eingefügt. Auch die Breadcrumb-Links werden hier erstellt.

- HomeRoute
- PageRoute
- MagazineArticleRoute
- MagazineListRoute
- SaleRoute
- SearchRoute
- FashionRoute
- BeautyRoute
- GroupedRoute

## organisms

  `theme/default/organisms`

Organismen sind die Verbindungen zu den Modulen. Hier werden ListInitializer aufgerufen und die Komponenten positioniert. Es passiert hier kein großartiges Styling. 

- StaticBlock
- CategoryContext
- MagazineArticle
- PageArticle
- ProductList
- MagazineList
- ProductQuickview
- Grouped

## molecules

  `theme/default/molecules`

Alles was mit Styling zu tun hat ist als Molekül zu betrachten. Moleküle haben keine Verbindung zu den Modulen sondern sind "pure" und rendern sich nur anhand ihrer Props oder States.

- ProductWidget
- MagazineWidget
- ProductGrid
- MagazineGrid
- Breadcrumbs
- Pagination
- Dropdown
- Slider
- Checkbox
- Spinner
- ImageSlider
- Button

## atoms

  `theme/default/atoms`

Atome sind keine gestylten Komponenten. Statdessen injected sie Logik, welche sie in ihrem State verwalten, oder dienem der Entwicklung (z.b ObjectID). Somit wären sie am besten als "utility-components" zu bezeichnen. Einzige Außnahme ist das Container Atom

- Container
- MaybeLink
- Portal
- Drawer
- Modal
- Toggle
- Timeout
- Icon
- LazyComponent
- Intl
- ObjectID
- DevComponent

## Header & Footler

  `theme/wucu/Header`
  `theme/wucu/Footer`
