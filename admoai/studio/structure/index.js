import {
  AnchorIcon,
  ArticleIcon,
  ContactIcon,
  ErrorIcon,
  PagesIcon,
  ProductIcon,
  SettingsIcon,
  SmallIcon
} from '../schemas/icons'
import hierarchicalPagesListItem from './hierarchicalPagesListItem'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export default (S, context) => {
  const client = context.getClient({ apiVersion: '2021-10-21' })
  return S.list()
    .id('__root__')
    .title('Content')
    .items([
      hierarchicalPagesListItem(S, client, 'page')
        .title('Pages')
        .icon(SmallIcon(PagesIcon)),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'scrollAnchor',
        title: 'Scroll Anchors',
        icon: SmallIcon(AnchorIcon),
        S,
        context
      }),
      orderableDocumentListDeskItem({
        type: 'productAnchor',
        title: 'Product Anchors',
        icon: SmallIcon(ProductIcon),
        S,
        context
      }),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'form',
        title: 'Forms',
        icon: SmallIcon(ArticleIcon),
        S,
        context
      }),
      S.documentTypeListItem('fileAsset').title('Files'),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .icon(SmallIcon(SettingsIcon))
        .child(
          S.list()
            .title('Site Settings')
            .id('settings')
            .items([
              S.listItem()
                .title('General')
                .icon(SettingsIcon)
                .child(
                  S.editor()
                    .id('settings')
                    .schemaType('settings')
                    .documentId('settings')
                ),
              S.listItem()
                .title('404 Not Found')
                .icon(ErrorIcon)
                .child(
                  S.editor()
                    .id('error-page-404')
                    .schemaType('errorPage')
                    .documentId('error-page-404')
                ),
              S.listItem()
                .title('500 Internal Server Error')
                .icon(ErrorIcon)
                .child(
                  S.editor()
                    .id('error-page-500')
                    .schemaType('errorPage')
                    .documentId('error-page-500')
                )
            ])
        )
    ])
}
