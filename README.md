# pwa 

![](https://github.com/nonz250/pwa/actions/workflows/deploy.yml/badge.svg)

https://pwa.nozomi.bike

このリポジトリは https://github.com/mdn/pwa-examples を参考に、

* typescript ベース
* 自分なりに解釈し、現実的な実装

し、

* オフライン対応
* WEB Push 通知対応
* PWA　対応

を実装しています。

そのうちオフラインで動作する簡単なアプリケーションにしていく予定。

## Development

### Build & Docker 起動

```bash
make
```

### TypeScript トランスパイル

```bash
cd frontend
npm run watch
```
