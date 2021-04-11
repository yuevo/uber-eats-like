class Restaurant < ApplicationRecord
  has_many :foods
  has_many :line_foods, through: :foods
  belongs_to :order, optional: true
  # 定数はすべて大文字で記述します
  DEFAULT_NAME_LENGTH = 30

  validates :name, :fee, :time_required, presence: true
  validates :name, length: { maximum: DEFAULT_NAME_LENGTH }
  validates :fee, numericality: { greater_than: 0 }
end
