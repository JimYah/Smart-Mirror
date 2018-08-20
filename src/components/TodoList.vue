<template>
  <div class="todo-list-wrap">
    <ul class="list-wrap">
      <li
        v-for="item in list"
        :key="item.id"
        class="list-wrap__item">
        <input class="list-wrap__item__checkbox-input" type="checkbox" :id="item.id">
        <label class="list-wrap__item__checkbox" :for="item.id" ></label>
        <span  class="list-wrap__item__text" v-html="item.content"></span>
       </li>
    </ul>
  </div>
</template>

<script>
import { getTodoList } from '@/utils/apis/todolist'

export default {
  name: 'TodoList',
  data () {
    return {
      list: []
    }
  },
  async mounted () {
    this.list = await getTodoList()
  }

}
</script>

<style lang="sass" scoped>
  .todo-list-wrap
    color: #fff
    .list-wrap
      display: flex
      flex-direction: column
      &__item
        display: flex
        &:not(:last-of-type)
          margin-bottom: 10px
        &__text
          display: flex
          justify-content: center
          align-items: center
        &__checkbox-input
          width: 0
          height: 0
          opacity: 0
          &:checked
            & ~ .list-wrap__item
              &__checkbox
                &:after
                  content: "v"
                  display: flex
                  justify-content: center
                  align-items: center
                  height: 100%
              &__text
                text-decoration: line-through
        &__checkbox
          display: block
          width: 30px
          height: 30px
          border: 2px solid #fff
          border-radius: 10px
          margin-right: 5px

</style>
